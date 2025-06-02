<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialAccountController extends Controller
{
    //
    public function index(Request $request)
    {
        $channels = $request->user()
            ->socialAccounts()
            ->get(['id', 'platform', 'platform_user_id', 'name', 'email', 'avatar', 'created_at']);

        return Inertia::render('Publish', [
            'channels' => $channels->map(function ($account) {
                return [
                    'id' => $account->id,
                    'platform' => $account->platform,
                    'username' => $account->platform_user_id,
                    'name' => $account->name,
                    'email' => $account->email,
                    'avatar' => $account->avatar,
                    'connected_at' => $account->created_at->format('M d, Y'),
                ];
            })
        ]);
    }
    public function accounts(Request $request)
    {
        $channels = $request->user()
            ->socialAccounts()
            ->get(['id', 'platform', 'platform_user_id', 'name', 'email', 'avatar', 'created_at']);

        return response()->json([
            'channels' => $channels->map(function ($account) {
                return [
                    'id' => $account->id,
                    'platform' => $account->platform,
                    'username' => $account->platform_user_id,
                    'name' => $account->name,
                    'email' => $account->email,
                    'avatar' => $account->avatar,
                    'connected_at' => $account->created_at->format('Y-m-d H:i:s'), // ISO format for JS
                ];
            })
        ]);
    }

    public function ConnectedAccounts(Request $request)
    {
        $channels = $request->user()
            ->socialAccounts()
            ->get(['id', 'platform', 'platform_user_id', 'name', 'email', 'avatar', 'created_at']);

        return Inertia::render('ConnectedAccountsPage', [
            'channels' => $channels->map(function ($account) {
                return [
                    'id' => $account->id,
                    'platform' => $account->platform,
                    'username' => $account->platform_user_id,
                    'name' => $account->name,
                    'email' => $account->email,
                    'avatar' => $account->avatar,
                    'connected_at' => $account->created_at->format('Y-m-d H:i:s'),
                ];
            })
        ]);
    }

    public function destroy(SocialAccount $socialAccount)
    {

        if (!auth()->user()->socialAccounts()->where('id', $socialAccount->id)->exists()) {
            abort(403, 'You don\'t own this channel');
        }

        try {

            $socialAccount->delete();

            return back()->with([
                'success' => 'Channel disconnected',
                'channels' => auth()->user()->socialAccounts
            ]);

        } catch (\Exception $e) {
            return back()->with('error', 'Disconnect failed: ' . $e->getMessage());
        }
    }
}
