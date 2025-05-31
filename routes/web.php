<?php

use App\Http\Controllers\AIContentController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SocialAccountController;
use App\Http\Controllers\TiktokController;
use App\Http\Controllers\TwitterController;
use App\Http\Controllers\YouTubeController;
use App\Http\Controllers\SocialAuthController;
use App\Models\SocialAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


Route::get('/', [LandingPageController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/posts/data', [PostController::class, 'index']);

    Route::post('/api/publish', [PostController::class, 'publish']);

    Route::get('/posts/schedule', function () {
        return Inertia::render('Post');
    });

    Route::get('/analytics', function () {
        return Inertia::render('Analytics');
    });

    Route::get('/facebook', function () {
        return Inertia::render('FacebookPages');
    });

    Route::get('/api/facebook/pages', [FacebookController::class, 'getFacebookPages']);
    Route::post('/api/facebook/post', [FacebookController::class, 'publishToFacebook']);
    Route::get('/api/facebook/{pageId}/posts', [FacebookController::class, 'getFacebookPosts']);
    Route::get('/api/facebook/{pageId}/analytics', [FacebookController::class, 'FacebookAnalytics']);

    Route::get('/oauth/instagram/redirect', function () {
        return Socialite::driver('facebook') // Yes, still "facebook"
            ->scopes(['instagram_basic', 'pages_show_list'])
            ->stateless()
            ->redirect();
    });


    Route::get('/post/facebook', function () {
        return Inertia::render('FacebookPost');
    });

    Route::get('/api/oauth/twitter/redirect', function () {
        return Socialite::driver('twitter')->redirect();
    });

    Route::get('/api/oauth/twitter/callback', function () {
        $twitterUser = Socialite::driver('twitter')->user();

        $user = auth()->user();
        $user->socialAccounts()->updateOrCreate([
            'platform' => 'twitter',
        ], [
            'platform_user_id' => $twitterUser->getId(),
            'access_token' => $twitterUser->token,
            'refresh_token' => $twitterUser->refreshToken,
            'name' => $twitterUser->getName(),
            'username' => $twitterUser->getNickname(),
            'avatar' => $twitterUser->getAvatar(),
        ]);
        return redirect('/post/publish')->with('success', 'X account connected!');
    });

    Route::get('/oauth/facebook/redirect', function () {
        return Socialite::driver('facebook')
            ->scopes([
                'email',
                'public_profile',
                'pages_manage_posts',
                'pages_show_list',
                'pages_read_engagement',
                'read_insights',
                'instagram_basic',
                'instagram_content_publish'
            ])
            ->stateless()
            ->with(['state' => auth()->id()])
            ->redirect();
    });
    Route::post('/api/twitter/post',[TwitterController::class,'postToTwitter']);


    Route::get('/oauth/facebook/callback', function () {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            $userId = request()->input('state');
            if (!$userId) {
                throw new \Exception('Missing user state.');
            }


            $user = \App\Models\User::findOrFail($userId);

            $user->socialAccounts()->updateOrCreate(
                ['platform' => 'facebook', 'user_id' => $user->id],
                [
                    'platform_user_id' => $facebookUser->getId(),
                    'access_token' => $facebookUser->token,
                    'refresh_token' => $facebookUser->refreshToken ?? null,
                    'token_expires_at' => now()->addSeconds($facebookUser->expiresIn ?? 3600),
                    'name' => $facebookUser->getName(),
                    'email' => $facebookUser->getEmail(),
                    'avatar' => $facebookUser->getAvatar(),
                ]
            );

            return Redirect::to('/post/publish')->with('success', 'Facebook account connected!');
        } catch (\Exception $e) {
            \Log::error('Facebook OAuth error', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return Redirect::to('/instagram')->with('error', 'Failed to connect Facebook. Check logs for details.');
        }
    });


    // routes/api.php
    Route::get('/api/youtube/analytics/list', [YouTubeController::class, 'getYouTubeAnalytics']);

    Route::get('/posts', [PostController::class, 'index']);


    Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('google.redirect');
    Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);


    Route::get('/api/oauth/youtube/redirect', function () {
        return Socialite::driver('google')
            ->scopes([
                'https://www.googleapis.com/auth/youtube.upload',
                'https://www.googleapis.com/auth/youtube.readonly'
            ])
            ->with([
                'access_type' => 'offline',
                'prompt' => 'consent',
                'state' => auth()->id() // Add user-specific state
            ])
            ->redirect();
    });



    Route::get('/api/oauth/youtube/callback', function () {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $state = request()->input('state');
            if ($state != auth()->id()) {
                throw new \Exception('Invalid state parameter');
            }

            $user = \App\Models\User::findOrFail(auth()->id());

            $user->socialAccounts()->updateOrCreate(
                ['platform' => 'youtube', 'user_id' => $user->id],
                [
                    'platform_user_id' => $googleUser->getId(),
                    'access_token' => $googleUser->token,
                    'refresh_token' => $googleUser->refreshToken,
                    'token_expires_at' => now()->addSeconds($googleUser->expiresIn),
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            return redirect('/post/publish')->with('success', 'YouTube account connected!');
        } catch (\Exception $e) {
            return redirect('/post/publish')->with('success', 'YouTube account connected!');
        }
    });

});



Route::get('/payment', [PaymentController::class, 'store'])->name('payment.store')->middleware('auth');
Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/api/youtube/channel', [YouTubeController::class, 'showChannel']);
    Route::delete('/channels/{socialAccount}', [SocialAccountController::class, 'destroy'])
        ->middleware(['auth'])
        ->name('channels.destroy');

    Route::post('/api/youtube/upload', [YouTubeController::class, 'uploadVideo']);

    Route::get('/posts', function () {
        return Inertia::render('YouTubeVideos');
    })->name('posts');

    Route::get('/api/youtube/videos', [YouTubeController::class, 'getYoutubeVideos']);
    Route::get('/api/youtube/analytics', [YouTubeController::class, 'fetchAnalytics']);
    Route::get('/auth/tiktok/callback', [TiktokController::class, 'handleCallback']);

    Route::get('/youtubeInfo', [YouTubeController::class, 'index']);


    Route::get('/post/publish', [SocialAccountController::class, 'index'])->name('post/publish');
    Route::get('/social/accounts', [SocialAccountController::class, 'accounts']);
    Route::delete('/post/publish/{socialAccount}', [SocialAccountController::class, 'destroy'])
        ->name('post/publish.destroy');
    Route::get('/youtubeUpload', function () {
        return Inertia::render('youtubeUpload');
    });

    Route::get('/youtubeSchedule', function () {
        return Inertia::render('youtubeUploadSchedule');
    });
    Route::get('/youtubeAnalytics', function () {
        return Inertia::render('youtubeAnalytics');
    });
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/contents/create', function () {
        return Inertia::render('CreateContent');
    });

    Route::get('/contents', [ContentController::class, 'index'])->name('contents.index');
    Route::post('/contents', [ContentController::class, 'store'])->name('contents.store');
    Route::put('/contents/{content}', [ContentController::class, 'update']);
    Route::delete('/contents/{id}', [ContentController::class, 'destroy']);
    Route::post('/api/ai/generate', [AIContentController::class, 'generate'])->name('generate.content');
    Route::get('/contents/generate', function () {
        return Inertia::render('Content/ContentGenerator');
    });
});


Route::get('/terms', function () {
    return Inertia::render('terms/terms');
});
Route::get('/privacy', function () {
    return Inertia::render('privacy/privacy');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
