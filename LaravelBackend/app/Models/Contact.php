<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Contact extends Model
{
    protected $collection = "contacts";

    protected $fillable = [
        "name",
        "email",
        "subject",
        "message",
        "status",
        "adminNotes"
    ];
}
