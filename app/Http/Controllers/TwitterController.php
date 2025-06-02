<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Support\Facades\Http;
use App\Services\TwitterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class TwitterController extends Controller
{
    //


    public function post(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:280',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4|max:51200'
        ]);

        try {
            $twitter = new TwitterService(auth()->id());

            $mediaPath = null;
            if ($request->hasFile('media')) {
                $path = $request->file('media')->store('twitter-media');
                $mediaPath = Storage::path($path);
            }

            $response = $twitter->postTweet(
                $request->content,
                $mediaPath
            );

            return response()->json([
                'success' => true,
                'tweet_id' => $response->data->id,
                'url' => "https://twitter.com/user/status/{$response->data->id}"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function postToTwitter(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:280',
        ]);

        $user = auth()->user();

        $account = $user->socialAccounts()
            ->where('platform', 'twitter')
            ->firstOrFail();

        $accessToken = $account->access_token;

        $response = Http::withToken($accessToken)
            ->post('https://api.twitter.com/2/tweets', [
                'text' => $request->text,
            ]);

        if ($response->successful()) {
            return response()->json([
                'success' => true,
                'message' => 'Tweet posted successfully!',
                'data' => $response->json(),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'error' => $response->json(),
            ], $response->status());
        }
    }
}
