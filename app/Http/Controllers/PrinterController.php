<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Printer;
use App\Models\PrinterConfig;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrinterController extends Controller
{
    public function getPrinters()
    {
        $printers = Printer::all();
        $printerConfig = PrinterConfig::first();

        $response = $printers->map(function($printer) {
            return [
                'PrinterID' => $printer->PrinterID,
                'Brand' => $printer->Brand,
                'Model' => $printer->Model,
                'Description' => $printer->Description,
                'CampusName' => $printer->CampusName,
                'BuildingName' => $printer->BuildingName,
                'RoomNumber' => $printer->RoomNumber,
                'PrinterStatus' => $printer->PrinterStatus,
            ];
        });

        if ($printerConfig) {
            $response2 = [
                'AllowedFileTypes' => explode(', ', $printerConfig->AllowedFileTypes),
            ];
        } else {
            $response2 = null; 
        }

        return response()->json([
            'status' => 'success',
            'printers' => $response,
            'AllowedFileTypes' => $response2
        ]);
    }
}
