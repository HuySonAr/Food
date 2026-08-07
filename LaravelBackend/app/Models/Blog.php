<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Blog extends Model
{
    protected $collection = "blogs";


    protected $fillable = [
        "title",
        "slug",
        "description",
        "coverImage",
        "coverImageFileId",
        "content",
        "author",
        "isPublished"
    ];

    protected function casts(): array
    {
        return [
            "isPublished" => "boolean"
        ];
    }

    public function authorAdmin(){
        return $this->belongsTo(Admin::class, "author", "_id");
    }
}
