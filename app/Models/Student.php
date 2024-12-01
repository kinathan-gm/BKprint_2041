<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'StudentID';
    protected $fillable = [
        'Name',
        'Email',
        'PageBalance',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
