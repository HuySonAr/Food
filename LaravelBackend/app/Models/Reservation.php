<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Reservation extends Model
{
    protected $collection = "reservations";

    protected $fillable = [
        "customerName",
        "phone",
        "reservationTime",
        "timeSlot",
        "guests",
        "status"
    ];

    protected function casts(): array
    {
        return [
            "reservationTime" => "datetime",
            "guests" => "integer"
        ];
    }

}
