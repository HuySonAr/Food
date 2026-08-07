<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class TempUpload extends Model
{
    protected $collection = "temp_uploads";

    protected $fillable = [
        "fileId",
        "url",
        "isUsed"
    ];

    protected function casts(): array
    {
        return [
            "isUsed" => "boolean"
        ];
    }
}
