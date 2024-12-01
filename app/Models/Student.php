<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Nếu bảng không tuân theo chuẩn "students"
    protected $table = 'students';

    // Các cột được phép thêm/sửa
    protected $fillable = [
        'Name',
        'Email',
        'PageBalance',
        'password',
    ];

    // Ẩn các cột nhạy cảm
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
