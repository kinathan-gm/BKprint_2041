<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrintJob extends Model
{
    use HasFactory;

    protected $primaryKey = 'PrintJobID';
    public $timestamps = true; // Sử dụng timestamps mặc định của Laravel
    
    protected $fillable = [
        'DocumentID',
        'PrinterID',
        'StartTime',
        'EndTime',
        'PaperSize',
        'PagesPrinted',
        'Copies',
        'IsDoubleSided',
        //'created_at',
        //'updated_at',
    ];
}