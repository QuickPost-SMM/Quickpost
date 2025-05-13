<?php

namespace App\Http\Controllers;
use Google_Client;
use Google_Service_YouTube;
use Google_Service_YouTubeAnalytics;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class YouTubeController extends Controller
{
    //

    public function posts(Request $request)
    {
        $videos = Post::where('user_id', auth()->id())->latest()->get();
        return response()->json($videos);
    }
    public function getYouTubeClient($user)
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

    public function showChannel(Request $request)
    {
        $user = $request->user();
        $youtube = $this->getYouTubeClient($user);

        $channelsResponse = $youtube->channels->listChannels('snippet,contentDetails,statistics', [
            'mine' => true,
        ]);

        return response()->json($channelsResponse);
    }



    public function uploadVideo(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string',
                'description' => 'nullable|string',
                'file' => 'required|file|mimetypes:video/mp4,video/x-m4v,video/*',
                'scheduledAt' => [
                    'nullable',
                    'date_format:Y-m-d\TH:i:s.000\Z',
                    function ($attribute, $value, $fail) {
                        $minTime = now()->addMinutes(15);
                        $scheduledTime = \Carbon\Carbon::parse($value);

                        if ($scheduledTime < $minTime) {
                            $fail('The scheduled time must be at least 15 minutes in the future.');
                        }

                        if ($scheduledTime > now()->addMonths(6)) {
                            $fail('The scheduled time cannot be more than 6 months in the future.');
                        }
                    }
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation failed:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        }

        $user = $request->user();
        $youtube = $this->getYouTubeClient($user);

        $videoPath = $request->file('file')->getPathname();

        // Prepare video snippet
        $videoSnippet = new \Google_Service_YouTube_VideoSnippet();
        $videoSnippet->setTitle($request->title);
        $videoSnippet->setDescription($request->description ?? '');
        $videoSnippet->setCategoryId('22'); // "People & Blogs"

        // Prepare video status
        $status = new \Google_Service_YouTube_VideoStatus();

        // Set privacy status based on scheduling
        if ($request->has('scheduledAt')) {
            $status->setPrivacyStatus('private'); // Must be private for scheduled videos
            $status->setPublishAt($request->scheduledAt);
        } else {
            $status->setPrivacyStatus('public'); // or 'private', 'unlisted'
        }

        $video = new \Google_Service_YouTube_Video();
        $video->setSnippet($videoSnippet);
        $video->setStatus($status);

        // Set up chunked upload
        $chunkSize = 1024 * 1024; // 1MB
        $client = $youtube->getClient();
        $client->setDefer(true);

        try {
            $insertRequest = $youtube->videos->insert('status,snippet', $video);

            $media = new \Google_Http_MediaFileUpload(
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
                'user_id' => auth()->id(),
                'post_id' => $uploadStatus['id'],
                'platform' => 'youtube',
                'title' => $uploadStatus['snippet']['title'],
                'description' => $uploadStatus['snippet']['description'] ?? null,
                'published_at' => $request->has('scheduledAt')
                    ? \Carbon\Carbon::parse($request->scheduledAt)
                    : \Carbon\Carbon::parse($uploadStatus['snippet']['publishedAt']),
                'status' => $request->has('scheduledAt') ? 'scheduled' : 'published',
            ]);

            $message = $request->has('scheduledAt')
                ? 'Video scheduled successfully for ' . \Carbon\Carbon::parse($request->scheduledAt)->format('M j, Y g:i A')
                : 'Video uploaded successfully';

            return response()->json([
                'message' => $message,
                'video_id' => $uploadStatus['id'],
                'scheduled_at' => $request->scheduledAt ?? null
            ]);

        } catch (\Google_Service_Exception $e) {
            \Log::error('YouTube API Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'YouTube API error',
                'errors' => json_decode($e->getMessage(), true)
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Upload Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function fetchAnalytics(Request $request)
    {
        $user = auth()->user();

        $client = $this->getYouTubeClient($user);

        $analytics = new Google_Service_YouTubeAnalytics($client->getClient());

        $report = $analytics->reports->query([
            'ids' => 'channel==MINE',
            'startDate' => '2025-04-10',
            'endDate' => '2025-05-05',
            'metrics' => 'views,likes,estimatedMinutesWatched',
            'dimensions' => 'day',
            'sort' => 'day'
        ]);

        return response()->json($report);
    }



    public function getYouTubeVideos()
    {
        $user = auth()->user();
        $youtube = $this->getYouTubeClient($user);

        try {
            // First get your channel ID
            $channelsResponse = $youtube->channels->listChannels('contentDetails', [
                'mine' => true
            ]);

            $channelId = $channelsResponse->items[0]->id;
            $uploadsPlaylistId = $channelsResponse->items[0]->contentDetails->relatedPlaylists->uploads;

            // Get all videos from your uploads playlist
            $videos = [];
            $nextPageToken = null;

            do {
                $playlistItemsResponse = $youtube->playlistItems->listPlaylistItems('snippet', [
                    'playlistId' => $uploadsPlaylistId,
                    'maxResults' => 50,
                    'pageToken' => $nextPageToken
                ]);

                foreach ($playlistItemsResponse->items as $item) {
                    $videoId = $item->snippet->resourceId->videoId;

                    // Get video statistics
                    $videoResponse = $youtube->videos->listVideos('snippet,statistics', [
                        'id' => $videoId
                    ]);

                    if (!empty($videoResponse->items)) {
                        $video = $videoResponse->items[0];
                        $videos[] = [
                            'video_id' => $videoId,
                            'title' => $video->snippet->title,
                            'description' => $video->snippet->description,
                            'published_at' => $video->snippet->publishedAt,
                            'thumbnail' => $video->snippet->thumbnails->high->url ?? null,
                            'url' => 'https://youtube.com/watch?v=' . $videoId,
                            'stats' => [
                                'views' => $video->statistics->viewCount ?? 0,
                                'likes' => $video->statistics->likeCount ?? 0,
                                'comments' => $video->statistics->commentCount ?? 0
                            ]
                        ];
                    }
                }

                $nextPageToken = $playlistItemsResponse->nextPageToken ?? null;

            } while ($nextPageToken);

            return response()->json(['videos' => $videos]);

        } catch (\Google_Service_Exception $e) {
            return response()->json([
                'error' => 'YouTube API error',
                'message' => json_decode($e->getMessage(), true)
            ], 500);
        }
    }


    public function getYouTubeAnalytics()
    {
        $user = auth()->user();
        $youtube = $this->getYouTubeClient($user);

        try {
            // Get channel analytics (requires YouTube Analytics API)
            $response = $youtube->channels->listChannels('statistics', [
                'mine' => true
            ]);

            $channel = $response->items[0];
            $stats = $channel->statistics;

            return response()->json([
                'metrics' => [
                    [
                        'name' => 'Subscribers',
                        'value' => $this->formatNumber($stats->subscriberCount),
                        'change' => $this->calculateChange($stats->subscriberCount, $stats->previousSubscriberCount),
                        'increasing' => $stats->subscriberCount > $stats->previousSubscriberCount,
                    ],
                    [
                        'name' => 'Views',
                        'value' => $this->formatNumber($stats->viewCount),
                        'change' => $this->calculateChange($stats->viewCount, $stats->previousViewCount),
                        'increasing' => $stats->viewCount > $stats->previousViewCount,
                    ],
                    [
                        'name' => 'Videos',
                        'value' => $this->formatNumber($stats->videoCount),
                        'change' => $this->calculateChange($stats->videoCount, $stats->previousVideoCount),
                        'increasing' => $stats->videoCount > $stats->previousVideoCount,
                    ],
                    [
                        'name' => 'Engagement Rate',
                        'value' => $this->calculateEngagementRate($stats),
                        'change' => 0,
                        'increasing' => $this->isEngagementIncreasing($stats),
                    ],
                ]
            ]);

        } catch (\Google_Service_Exception $e) {
            return response()->json([
                'error' => 'YouTube API error',
                'message' => json_decode($e->getMessage(), true)
            ], 500);
        }
    }

    private function formatNumber($num)
    {
        if ($num >= 1000000) {
            return round($num / 1000000, 1) . 'M';
        }
        if ($num >= 1000) {
            return round($num / 1000, 1) . 'K';
        }
        return $num;
    }

    private function calculateChange($current, $previous)
    {
        if ($previous == 0)
            return 0;
        return round(($current - $previous) / $previous * 100, 1);
    }

    private function calculateEngagementRate($stats)
    {
        if ($stats->viewCount == 0)
            return '0%';
        $rate = (($stats->likeCount + $stats->commentCount) / $stats->viewCount) * 100;
        return round($rate, 1) . '%';
    }

    private function isEngagementIncreasing($stats)
    {
        // Your logic to determine if engagement is increasing
        return true; // Simplified for example
    }
}
