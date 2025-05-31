<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledPost extends Model
{
    //
    // app/Models/ScheduledPost.php
    protected $fillable = [
        'user_id',
        // Add all other fillable fields here
        'title',
        'description',
        'media_url',
        'platforms',
        'facebook_page_id',
        'video_path',
        'image_path',
        'result',
        'errors',
        'published_at',
        'created_at',
        'updated_at', 
        'status',
        'scheduled_at'
    ];
}
