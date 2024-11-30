<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spso extends Model
{
    use HasFactory;

    // Nếu bảng không tuân theo chuẩn "spsos"
    protected $table = 'spsos';

    // Các cột được phép thêm/sửa
    protected $fillable = [
        'Name',
        'Email',
        'password',
    ];

    // Ẩn các cột nhạy cảm
    protected $hidden = [
        'password',
        'remember_token',
    ];
}
