<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Payment extends Model
{
    //
    use HasFactory;
    protected $primaryKey = 'PaymentID';
    protected $fillable = ['Amount', 'PaymentMethod','Date','StudentID'];
    public function student()
    {
        return $this->belongsTo(Student::class, 'StudentID', 'StudentID');
    }

}
