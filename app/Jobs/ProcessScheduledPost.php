<?php

namespace App\Jobs;

use App\Models\ScheduledPost;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\PostController;
class ProcessScheduledPost implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public ScheduledPost $scheduledPost) {}

    public function handle()
    {
        try {
            $this->scheduledPost->update(['status' => 'processing']);

            $request = new Request([
                'title' => $this->scheduledPost->title,
                'description' => $this->scheduledPost->description,
                'platforms' => $this->scheduledPost->platforms,
                'facebook_page_id' => $this->scheduledPost->facebook_page_id,
                'file' => $this->scheduledPost->video_path 
                    ? new UploadedFile(
                        Storage::disk('public')->path($this->scheduledPost->video_path),
                        basename($this->scheduledPost->video_path)
                    )
                    : null,
                'image' => $this->scheduledPost->image_path
                    ? new UploadedFile(
                        Storage::disk('public')->path($this->scheduledPost->image_path),
                        basename($this->scheduledPost->image_path)
                    )
                    : null,
            ]);

            $controller = App::make(PostController::class);
            $response = $controller->publishImmediately($request);

            $this->scheduledPost->update([
                'status' => 'published',
                'published_at' => now(),
                'result' => $response->getData(),
            ]);

            // Cleanup files
            if ($this->scheduledPost->video_path) {
                Storage::disk('public')->delete($this->scheduledPost->video_path);
            }
            if ($this->scheduledPost->image_path) {
                Storage::disk('public')->delete($this->scheduledPost->image_path);
            }

        } catch (\Exception $e) {
            $this->scheduledPost->update([
                'status' => 'failed',
                'errors' => ['message' => $e->getMessage()],
            ]);
            Log::error("Failed to process scheduled post {$this->scheduledPost->id}: " . $e->getMessage());
        }
    }
}