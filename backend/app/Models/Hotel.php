<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'address', 'cost_per_night', 'available_rooms', 'image', 'average_rating'
    ];
}
