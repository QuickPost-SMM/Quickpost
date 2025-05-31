<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Content extends Model
{
    //
    protected $appends = ['media_url'];

    public function getMediaUrlAttribute()
    {
        if (!$this->media_url) {
            return null;
        }

        return Storage::disk('public')->url($this->media_url);
    }

    public function getFileTypeAttribute()
    {
        if (!$this->media_url)
            return null;

        $extension = pathinfo($this->media_url, PATHINFO_EXTENSION);

        return match (strtolower($extension)) {
            'jpg', 'jpeg', 'png', 'gif' => 'image',
            'mp4', 'mov' => 'video',
            'pdf' => 'document',
            'doc', 'docx' => 'word',
            default => 'file',
        };
    }
    protected $fillable = [
        'title',
        'description',
        'media_url',
        'status',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}