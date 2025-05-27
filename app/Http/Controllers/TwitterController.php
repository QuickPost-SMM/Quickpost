<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class TwitterController extends Controller
{
    //
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
