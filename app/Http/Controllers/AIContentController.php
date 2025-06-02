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
        $enhancedPrompt = "Act as a top social media strategist. Analyze the user's input and generate a viral-worthy post that will:
        1. First line: Hook attention with a bold statement/question
        2. Second line: Add context or problem identification
        3. Third line: Provide value/solution (educational, entertaining or inspiring)
        4. Fourth line: Include social proof or credibility element if relevant
        5. Fifth line: Call-to-action (engagement prompt)
        6. Sixth line: 3-5 relevant hashtags and 1-2 emojis
        
        Keep it platform-agnostic but optimized for Instagram/LinkedIn/TikTok. The user's input is: " . $request->prompt;
    
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
