<?php

// app/Services/TwitterService.php
namespace App\Services;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\Models\SocialAccount;

class TwitterService
{
    protected $connection;

    public function __construct($userId)
    {
        $account = SocialAccount::where('user_id', $userId)
                      ->where('platform', 'twitter')
                      ->firstOrFail();

        $this->connection = new TwitterOAuth(
            config('services.twitter.client_id'),
            config('services.twitter.client_secret'),
            $account->access_token,
            $account->access_token_secret ?? ''
        );
    }

    public function postTweet($content, $mediaPath = null)
    {
        $mediaId = null;
        
        if ($mediaPath) {
            $media = $this->connection->upload('media/upload', [
                'media' => $mediaPath,
                'media_type' => mime_content_type($mediaPath)
            ]);
            $mediaId = $media->media_id_string;
        }

        $parameters = [
            'text' => $content
        ];

        if ($mediaId) {
            $parameters['media'] = ['media_ids' => [$mediaId]];
        }

        return $this->connection->post('tweets', $parameters);
    }
}