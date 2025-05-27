<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FacebookController extends Controller
{
    //
    public function getFacebookPages()
    {
        $user = auth()->user();

        $account = $user->socialAccounts()->where('platform', 'facebook')->first();
        if (!$account) {
            return response()->json(['error' => 'No connected Facebook account'], 404);
        }

        $response = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $account->access_token,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch pages'], 500);
        }

        return $response->json()['data'];
    }

    public function publishToFacebook(Request $request)
    {
        $request->validate([
            'page_id' => 'required',
            'message' => 'required|string|max:1000',
        ]);

        $user = auth()->user();

        $account = $user->socialAccounts()->where('platform', 'facebook')->first();
        if (!$account) {
            return response()->json(['error' => 'No connected Facebook account'], 404);
        }

        // Get page access token
        $pages = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $account->access_token,
        ]);

        $page = collect($pages->json()['data'] ?? [])->firstWhere('id', $request->page_id);
        if (!$page) {
            return response()->json(['error' => 'Page not found or unauthorized'], 403);
        }

        // // Post to the page
        $post = Http::post("https://graph.facebook.com/{$page['id']}/feed", [
            'message' => $request->message,
            'access_token' => $page['access_token'],
        ]);

        if ($post->failed()) {
            return response()->json(['error' => 'Failed to publish post'], 500);
        }

        return response()->json(['success' => true, 'post' => $post->json()]);

    }

    public function pages()
    {
        $user = auth()->user();
        $social = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$social) {
            return response()->json(['error' => 'Facebook not connected'], 403);
        }

        $userAccessToken = $social->access_token;

        $response = Http::get('https://graph.facebook.com/v19.0/me/accounts', [
            'access_token' => $userAccessToken,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => $response->json()], 500);
        }

        return response()->json($response->json());
    }

    public function getFacebookPosts(Request $request)
    {
        $pageId = $request->pageId;
        $user = auth()->user();
        $social = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$social) {
            return response()->json(['error' => 'Facebook not connected'], 403);
        }

        // Step 1: Get list of pages with tokens
        $accountResponse = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $social->access_token,
        ]);

        if ($accountResponse->failed()) {
            return response()->json(['error' => 'Unable to fetch user pages'], 500);
        }

        $pages = $accountResponse->json('data');
        $matchedPage = collect($pages)->firstWhere('id', $pageId);

        if (!$matchedPage || !isset($matchedPage['access_token'])) {
            return response()->json(['error' => 'Page access token not found'], 404);
        }

        $pageAccessToken = $matchedPage['access_token'];

        // Step 2: Fetch posts
        $posts = Http::get("https://graph.facebook.com/v19.0/{$pageId}/posts", [
            'fields' => 'id,message,created_time,permalink_url,full_picture,insights.metric(post_impressions),shares',
            'access_token' => $pageAccessToken,
        ]);

        if ($posts->failed()) {
            return response()->json(['error' => $posts->json()], 500);
        }

        return response()->json($posts->json());
    }


    public function FacebookAnalytics(Request $request)
    {
        $pageId = $request->pageId;
        $user = auth()->user();
        $social = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$social) {
            return response()->json(['error' => 'Facebook not connected'], 403);
        }

        // Fetch page access token
        $pageInfo = Http::get("https://graph.facebook.com/v19.0/{$pageId}", [
            'fields' => 'access_token',
            'access_token' => $social->access_token,
        ]);

        if ($pageInfo->failed()) {
            return response()->json(['error' => 'Failed to fetch page access token'], 500);
        }

        $pageAccessToken = $pageInfo->json('access_token');

        // Fetch insights
        $insights = Http::get("https://graph.facebook.com/v19.0/{$pageId}/insights", [
            'metric' => 'page_impressions,page_views_total,page_post_engagements',
            'access_token' => $pageAccessToken,
        ]);

        if ($insights->failed()) {
            return response()->json(['error' => $insights->json()], 500);
        }

        return response()->json($insights->json());
    }

}
