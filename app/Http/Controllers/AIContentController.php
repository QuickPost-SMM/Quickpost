<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class AIContentController extends Controller
{
    //
    public function generate(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

            // Enhanced prompt with social media expert context
            $enhancedPrompt = "Create one concise social media post (single paragraph) that includes:
            1. An attention-grabbing hook
            2. Valuable insight about: " . $request->prompt . "
            3. A call-to-action
            4. 3-5 relevant hashtags
            5. 1-2 emojis
            Make it platform-agnostic but optimized for Instagram/LinkedIn/TikTok. 
            Return ONLY the final post content, no explanations or options.";

            $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY'), [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $enhancedPrompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topP' => 0.9,
                        'maxOutputTokens' => 1000
                    ]
                ]);

            $data = $response->json();

            $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'No response generated.';

            // Return only the generated content
        return response()->json([
            'content' => $reply
        ]);
    }


//     public function generate(Request $request)
//     {
//         $request->validate([
//             'prompt' => 'required',
//         ]);

//         $apiKey = env('GEMINI_API_KEY');
//         if (empty($apiKey)) {
//             return response()->json([
//                 'error' => 'API key not configured',
//                 'solution' => 'Please set GEMINI_API_KEY in your .env file'
//             ], 500);
//         }

//         $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$apiKey}";

//         try {
//             $response = Http::timeout(30)
//                 ->withHeaders([
//                     'Content-Type' => 'application/json',
//                 ])
//                 ->post($url, [
//                     'contents' => [
//                         [
//                             'parts' => [
//                                 ['text' => $request->prompt]
//                             ]
//                         ]

//                     ],
//                     'generationConfig' => [
//                         'temperature' => 0.7,
//                         'maxOutputTokens' => 1000
//                     ]
//                 ]);

//             // Debugging response
//             logger()->info('Gemini API Response', [
//                 'status' => $response->status(),
//                 'body' => $response->json() ?? $response->body()
//             ]);

//             if ($response->failed()) {
//                 throw new \Exception($response->body());
//             }

//             $data = $response->json();

//             if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
//                 throw new \Exception('Unexpected API response structure');
//             }

//             return response()->json([
//                 'content' => $data['candidates'][0]['content']['parts'][0]['text']
//             ]);

//         } catch (\Exception $e) {
//             logger()->error('Gemini API Error', ['error' => $e->getMessage()]);
//             return response()->json([
//                 'error' => 'API request failed',
//                 'message' => $e->getMessage(),
//                 'solution' => 'Please verify your API key and billing setup'
//             ], 500);
//         }
//     }
}
