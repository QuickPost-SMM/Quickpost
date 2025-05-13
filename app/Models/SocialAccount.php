<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    //
    protected $fillable = [
        'user_id',
        'platform',
        'platform_user_id',
        'access_token',
        'refresh_token',
        'token_expires_at',
        'name',
        'email',
        'avatar'
    ];
    protected $casts = [
        'token_expires_at' => 'datetime',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
