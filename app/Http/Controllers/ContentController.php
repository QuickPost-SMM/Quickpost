<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;

class ContentController extends Controller
{
    //
    public function index()
    {
        $contents = Content::where('user_id', auth()->id())->latest()->get();
        return response()->json($contents);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'media_url' => 'nullable',
            'status' => 'in:unassigned,to-do,doing,done',
        ]);

        Content::create([
            'title' => $request->title,
            'description' => $request->description,
            'media_url' => $request->media_url,
            'status' => $request->status ?? 'unassigned',
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Content created.');
    }

    public function destroy($id)
    {
        try {
            $content = Content::findOrFail($id);
            $content->delete();

            return response()->json([
                'success' => true,
                'message' => 'Content deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete content'
            ], 500);
        }
    }   
}
