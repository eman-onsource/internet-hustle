<?php

namespace App\Models;

use App\Models\Client;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'speed',
        'price',
    ];

    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
