<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Printer extends Model
{
    use HasFactory;

    protected $table = 'printers';

    
    protected $primaryKey = 'PrinterID';
    protected $fillable = [
        'Brand',
        'Model',
        'Description',
        'CampusName',
        'BuildingName',
        'RoomNumber',
        'PrinterStatus'
    ];
}