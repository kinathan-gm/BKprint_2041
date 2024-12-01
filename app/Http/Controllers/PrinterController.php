<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Printer;
use App\Models\PrinterConfig;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrinterController extends Controller {
    public function getPrinters(){
        $printers = Printer::where('PrinterStatus', 'active')->get();
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

    public function getPrinterByID(Request $request)
    {
        $id = $request->query('id');
        $printer = Printer::find($id);  
        if (!$printer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Máy in không tồn tại',
            ], 404);
        }
        return response()->json([
            'status' => 'success',

    public function getAdminPrinters(){
        $printers = Printer::all();

        $response = $printers->map(function($printer) {
            return [
                'id' => $printer->PrinterID,
                'name' => $printer->Brand . ' - ' . $printer->Model,
                'location' => $printer->CampusName . ' - ' . $printer->BuildingName . ' - ' . $printer->RoomNumber,
                'status' => $printer->PrinterStatus === 'Active' ? 'on' : 'off',
            ];
        });

        return response()->json([
            'status' => 'success',
            'printers' => $response,
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255', 
        ]);

        [$brand, $model] = explode(' - ', $validated['name']) + [null, null];
        if (!$brand || !$model) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tên máy in không hợp lệ. Định dạng phải là "Brand - Model".',
            ], 422);
        }

        [$campusName, $buildingName, $roomNumber] = explode(' - ', $validated['location']) + [null, null, null];
        if (!$campusName || !$buildingName || !$roomNumber) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vị trí không hợp lệ. Định dạng phải là "CampusName - BuildingName - RoomNumber".',
            ], 422);
        }

        $printer = Printer::create([
            'Brand' => $brand,
            'Model' => $model,
            'Description' => '', 
            'CampusName' => $campusName,
            'BuildingName' => $buildingName,
            'RoomNumber' => $roomNumber,
            'PrinterStatus' => 'Active',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Máy in đã được thêm thành công.',
            'printer' => $printer,
        ], 201);
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:on,off',
        ]);

        [$brand, $model] = explode(' - ', $validatedData['name']) + [null, null];
        if (!$brand || !$model) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tên máy in không hợp lệ. Định dạng phải là "Brand - Model".',
            ], 422);
        }

        [$campusName, $buildingName, $roomNumber] = explode(' - ', $validatedData['location']) + [null, null, null];
        if (!$campusName || !$buildingName || !$roomNumber) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vị trí không hợp lệ. Định dạng phải là "CampusName - BuildingName - RoomNumber".',
            ], 422);
        }

        $status = ($validatedData['status'] == 'on') ? 'Active' : 'Inactive';

        $printer = Printer::find($id);

        if (!$printer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Máy in không tồn tại.',
            ], 404);
        }

        $printer->Brand = $brand;
        $printer->Model = $model;
        $printer->CampusName = $campusName;
        $printer->BuildingName = $buildingName;
        $printer->RoomNumber = $roomNumber;
        $printer->PrinterStatus = $status;


        $printer->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật máy in thành công.',

            'printer' => $printer,
        ]);
    }
}
