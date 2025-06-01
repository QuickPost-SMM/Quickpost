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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,mov', // 25MB max
            'status' => 'required',
        ]);

        try {
            $filePath = null;

            if ($request->hasFile('file')) {
                $file = $request->file('file');

                // Generate safe filename with timestamp and original extension
                $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9\.\-]/', '_', $file->getClientOriginalName());

                // Store file in public storage
                $filePath = $file->storeAs('uploads', $fileName, 'public');
            }

            Content::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'media_url' => $filePath, // Only storing the path
                'status' => $validated['status'],
                'user_id' => auth()->id(),
            ]);

            return redirect()->back()->with('success', 'Content created successfully.');

        } catch (\Exception $e) {
            // Delete the file if upload succeeded but DB failed
            if (isset($filePath)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($filePath);
            }

            return back()->withInput()
                ->with('error', 'Error creating content: ' . $e->getMessage());
        }
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,mov',
        ]);

        try {
            $content = Content::findOrFail($id);
            $filePath = $content->media_url;

            if ($request->hasFile('file')) {
                // Delete old file if exists
                if ($content->media_url) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($content->media_url);
                }

                $file = $request->file('file');

                // Generate safe filename with timestamp and original extension
                $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9\.\-]/', '_', $file->getClientOriginalName());

                // Store file in public storage
                $filePath = $file->storeAs('uploads', $fileName, 'public');
            }

            $content->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'media_url' => $filePath,
                'status' => $validated['status'],
            ]);

            return redirect()->back()->with('success', 'Content updated successfully');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
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
