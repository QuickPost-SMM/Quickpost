<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\SocialAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Google_Client;
use Google_Service_YouTube;
use Google_Service_YouTube_Video;
use Google_Service_YouTube_VideoSnippet;
use Google_Service_YouTube_VideoStatus;
use Google_Http_MediaFileUpload;

class PostController extends Controller
{
    public function publish(Request $request)
    {
        // Validate common fields
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'platforms' => 'required|array',
            'platforms.*' => 'in:youtube,facebook',
            'facebook_page_id' => 'required_if:platforms,facebook',
            'scheduledAt' => 'nullable|date_format:Y-m-d\TH:i:s.000\Z',
            'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/gif'
        ]);

        // Additional validation for YouTube
        if (in_array('youtube', $request->platforms)) {
            $request->validate([
                'file' => 'required|file|mimetypes:video/mp4,video/x-m4v,video/*|max:102400' // 100MB max
            ]);

            if (!$request->hasFile('file')) {
                return response()->json([
                    'message' => 'Video file is required for YouTube',
                    'errors' => ['file' => ['Video file is required']]
                ], 422);
            }
        }

        $results = [];
        $errors = [];

        try {
            // Handle YouTube publishing
            if (in_array('youtube', $request->platforms)) {
                try {
                    $youtubeResult = $this->publishToYouTube($request);
                    $results['youtube'] = $youtubeResult;
                } catch (\Exception $e) {
                    $errors['youtube'] = $this->formatError($e);
                    Log::error('YouTube publish failed: ' . $e->getMessage());
                }
            }

            // Handle Facebook publishing
            if (in_array('facebook', $request->platforms)) {
                try {
                    $facebookResult = $this->publishToFacebook($request);
                    $results['facebook'] = $facebookResult;
                } catch (\Exception $e) {
                    $errors['facebook'] = $this->formatError($e);
                    Log::error('Facebook publish failed: ' . $e->getMessage());
                }
            }

            // Handle response
            if (empty($results)) {
                return response()->json([
                    'message' => 'All selected platforms failed to publish',
                    'errors' => $errors
                ], 500);
            }

            return response()->json([
                'message' => count($errors) ? 'Published with some errors' : 'Successfully published',
                'results' => $results,
                'errors' => count($errors) ? $errors : null
            ]);

        } catch (\Exception $e) {
            Log::error('Publish failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Publish failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function publishToYouTube(Request $request)
    {
        try {
            $videoFile = $request->file('file');
            $videoPath = $videoFile->getPathname();

            $user = $request->user();
            $youtube = $this->getYouTubeClient($user);

            // Prepare video snippet
            $videoSnippet = new Google_Service_YouTube_VideoSnippet();
            $videoSnippet->setTitle($request->title);
            $videoSnippet->setDescription($request->description ?? '');
            $videoSnippet->setCategoryId('22'); // "People & Blogs"

            // Prepare video status
            $status = new Google_Service_YouTube_VideoStatus();
            if ($request->has('scheduledAt')) {
                $status->setPrivacyStatus('private');
                $status->setPublishAt($request->scheduledAt);
            } else {
                $status->setPrivacyStatus('public');
            }

            $video = new Google_Service_YouTube_Video();
            $video->setSnippet($videoSnippet);
            $video->setStatus($status);

            // Set up chunked upload
            $chunkSize = 1024 * 1024; // 1MB
            $client = $youtube->getClient();
            $client->setDefer(true);

            $insertRequest = $youtube->videos->insert('status,snippet', $video);
            $media = new Google_Http_MediaFileUpload(
                $client,
                $insertRequest,
                'video/*',
                null,
                true,
                $chunkSize
            );

            $media->setFileSize(filesize($videoPath));
            $uploadStatus = false;
            $handle = fopen($videoPath, "rb");
            while (!$uploadStatus && !feof($handle)) {
                $chunk = fread($handle, $chunkSize);
                $uploadStatus = $media->nextChunk($chunk);
            }
            fclose($handle);
            $client->setDefer(false);

            // Save to database
            Post::create([
                'user_id' => $user->id,
                'post_id' => $uploadStatus['id'],
                'platform' => 'youtube',
                'title' => $uploadStatus['snippet']['title'],
                'description' => $uploadStatus['snippet']['description'] ?? null,
                'published_at' => $request->has('scheduledAt')
                    ? \Carbon\Carbon::parse($request->scheduledAt)
                    : \Carbon\Carbon::parse($uploadStatus['snippet']['publishedAt']),
                'status' => $request->has('scheduledAt') ? 'scheduled' : 'published',
            ]);

            return [
                'video_id' => $uploadStatus['id'],
                'message' => $request->has('scheduledAt')
                    ? 'Video scheduled successfully'
                    : 'Video uploaded successfully',
                'scheduled_at' => $request->scheduledAt ?? null
            ];

        } catch (\Google_Service_Exception $e) {
            throw new \Exception('YouTube API error: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('YouTube upload failed: ' . $e->getMessage());
        }
    }

    protected function publishToFacebook(Request $request)
    {
        try {
            $user = $request->user();
            $account = $user->socialAccounts()->where('platform', 'facebook')->first();

            if (!$account) {
                throw new \Exception('No connected Facebook account');
            }

            // Get page access token
            $pages = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
                'access_token' => $account->access_token,
            ]);

            $page = collect($pages->json()['data'] ?? [])->firstWhere('id', $request->facebook_page_id);
            if (!$page) {
                throw new \Exception('Page not found or unauthorized');
            }

            $response = null;
            $postData = [
                'message' => $request->title ?? $request->description,
                'access_token' => $page['access_token']
            ];

            // Check for video upload
            if ($request->hasFile('video')) {
                $video = $request->file('video');
                if (!$video->isValid()) {
                    throw new \Exception('Invalid video file');
                }

                $response = Http::attach(
                    'source',
                    fopen($video->getPathname(), 'r'),
                    $video->getClientOriginalName()
                )->post("https://graph.facebook.com/v19.0/{$page['id']}/videos", $postData);
            }
            // Check for image upload
            elseif ($request->hasFile('image')) {
                $image = $request->file('image');
                if (!$image->isValid()) {
                    throw new \Exception('Invalid image file');
                }

                $response = Http::attach(
                    'source',
                    fopen($image->getPathname(), 'r'),
                    $image->getClientOriginalName()
                )->post("https://graph.facebook.com/v19.0/{$page['id']}/photos", $postData);
            }
            // Text-only post
            else {
                $response = Http::post("https://graph.facebook.com/v19.0/{$page['id']}/feed", $postData);
            }

            if ($response->failed()) {
                $error = $response->json();
                throw new \Exception($error['error']['message'] ?? 'Failed to publish post to Facebook');
            }

            // Save to database
            $post = Post::create([
                'user_id' => $user->id,
                'post_id' => $response->json()['id'] ?? $response->json()['post_id'],
                'platform' => 'facebook',
                'title' => $request->title,
                'description' => $request->description ?? null,
                'media_type' => $request->hasFile('video') ? 'video' :
                    ($request->hasFile('image') ? 'image' : 'text'),
                'published_at' => now(),
                'status' => 'published',
            ]);

            return [
                'post_id' => $post->post_id,
                'message' => 'Post published successfully',
                'media_type' => $post->media_type
            ];

        } catch (\Exception $e) {
            throw new \Exception('Facebook publish failed: ' . $e->getMessage());
        }
    }

    protected function getYouTubeClient($user)
    {
        $client = new Google_Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $socialAccount = $user->socialAccounts()
            ->where('platform', 'youtube')
            ->firstOrFail();

        $expiresAt = \Carbon\Carbon::parse($socialAccount->token_expires_at);
        $client->setAccessToken([
            'access_token' => $socialAccount->access_token,
            'refresh_token' => $socialAccount->refresh_token,
            'expires_in' => now()->diffInSeconds($expiresAt),
        ]);

        $client->setScopes([
            Google_Service_YouTube::YOUTUBE_READONLY,
            Google_Service_YouTube::YOUTUBE_UPLOAD,
            Google_Service_YouTube::YOUTUBE_FORCE_SSL,
            'https://www.googleapis.com/auth/youtube.channel-memberships.creator',
            'https://www.googleapis.com/auth/yt-analytics.readonly',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/youtube.force-ssl'
        ]);
        return new Google_Service_YouTube($client);
    }

    protected function formatError(\Exception $e)
    {
        return [
            'message' => $e->getMessage(),
            'code' => $e->getCode()
        ];
    }
}