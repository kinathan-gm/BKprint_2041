<?php

//History Print_job
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class print_job extends Model
{
    use HasFactory;

    protected $primaryKey = 'print_jobID';
    protected $fillable = [
        'DocumentID',
        'PrinterID',
        'StartTime',
        'EndTime',
        'PaperSize',
        'PagesPrinted',
        'Copies',
        'IsDoubleSided',
        'created_at',
        'updated_at',
    ];
}
