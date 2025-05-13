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
        $enhancedPrompt = "You are a social media expert. " .
            "The user is creating content for their social media channels. " .
            "Please help them refine this idea into an engaging social media post. " .
            "User's input: " . $request->prompt . " " .
            "Provide a well-structured post with appropriate hashtags and emojis if relevant.";
    
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
}
