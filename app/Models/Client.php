<?php

namespace App\Models;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'plan_id',
        'subscription_date',
        'expiration_date',
        'status',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
