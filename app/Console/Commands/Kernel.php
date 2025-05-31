<?php

namespace App\Console\Commands;

use App\Jobs\ProcessScheduledPost;
use App\Models\ScheduledPost;
use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;

class Kernel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule';

    /**
     * The console command description. 
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            ScheduledPost::where('status', 'scheduled')
                ->where('scheduled_at', '<=', now()->addMinutes(5))
                ->each(function ($post) {
                    ProcessScheduledPost::dispatch($post);
                });
        })->everyFiveMinutes();
    }
}
