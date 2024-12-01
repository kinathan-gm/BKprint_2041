<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $primaryKey = 'DocumentID';
    public $timestamps = false; // Sử dụng timestamps mặc định của Laravel
    protected $fillable = [
        'StudentID',
        'FileName',
        'FileType',
        'UploadedDate',
        //'created_at',
        //'updated_at',
    ];
}