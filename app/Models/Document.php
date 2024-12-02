<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $primaryKey = 'DocumentID';

    protected $fillable = [
        'StudentID', 
        'FileName', 
        'FileType', 
        'UploadedDate',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'StudentID', 'StudentID');
    }
}

