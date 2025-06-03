<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $fillable = [
        'user_id',
        'plan_name',
        'amount',
        'currency',
        'status',
        'transaction_ref',
    ];
}
