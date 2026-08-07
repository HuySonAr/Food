<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use MongoDB\Laravel\Eloquent\Model;

class Admin extends Model implements AuthenticatableContract {
    use Authenticatable;

    protected $collection = "admin";
    protected $fillable = ["email", "password", "role", "refreshToken", "resetOtp", "resetOtpExpire"];
    protected $hidden = [
        "password",
        "refreshToken",
        "resetOtp"
    ];

    protected function casts(): array
    {
        return [
            "password" => "hashed",
            "resetOtpExpire" => "datetime"
        ];
    }
}
