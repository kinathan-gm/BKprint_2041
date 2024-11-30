<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class PrinterConfig extends Model
{
    use HasFactory;

    protected $table = 'printer_configurations';
    protected $primaryKey = 'ConfigID ';
    protected $fillable = [
        'SPSOID',
        'PrinterID',
        'DefaultPages',
        'AllowedFileTypes',
        'ConfigDate',
        'ConfigPrinterStatus',
    ];
}
