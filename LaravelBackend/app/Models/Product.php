<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model{
    protected $collection = "products";

    protected $fillable = ["name", "category", "price", "image", "ImageFileId", "description", "isAvailable"];

    protected function casts(): array
    {
        return [
            'price' => 'float',
            'isAvailable' => 'boolean',
        ];
    }
}
