<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrinterConfig;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrinterConfigurationController extends Controller
{
    public function getConfig(){
        $printerConfig = PrinterConfig::first();

        if ($printerConfig) {
            $response = [
                'DefaultPages' => $printerConfig->DefaultPages,
                'ConfigDate' => $printerConfig->ConfigDate,
                'AllowedFileTypes' => explode(', ', $printerConfig->AllowedFileTypes),
            ];
        } else {
            $response = null; 
        }

        return response()->json([
            'status' => 'success',
            'config' => $response
        ]);
    }

    public function updateNumPages(Request $request)
    {
        $request->validate([
            'numPages' => 'required|integer|min:0', 
        ]);

        $printerConfig = PrinterConfig::first();
        if ($printerConfig) {
            $printerConfig->DefaultPages = $request->input('numPages');
            $printerConfig->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Số tờ cấp phát đã được cập nhật.',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy cấu hình máy in.',
            ]);
        }
    }

    public function updateConfigDate(Request $request)
    {
        $request->validate([
            'configDate' => 'required|date_format:Y-m-d', 
        ]);

        $printerConfig = PrinterConfig::first();
        if ($printerConfig) {
            $printerConfig->ConfigDate = $request->input('configDate');
            $printerConfig->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Ngày cấp phát đã được cập nhật.',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy cấu hình máy in.',
            ]);
        }
    }

    public function updateAllowedFileTypes(Request $request)
    {
        $request->validate([
            'allowedFileTypes' => 'required|array',  
            'allowedFileTypes.*' => 'in:XLS,DOCX,JPG,PPTX,PNG,PDF',
        ]);

        $printerConfig = PrinterConfig::first();
        if ($printerConfig) {
            $printerConfig->AllowedFileTypes = implode(', ', $request->input('allowedFileTypes'));
            $printerConfig->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Các loại file được phép tải lên đã được cập nhật.',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy cấu hình máy in.',
            ]);
        }
    }
}
