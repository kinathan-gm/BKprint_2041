<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\print_job;
use App\Models\Document;
use Illuminate\Support\Facades\DB as DB;
use Illuminate\Http\Request;



class HistoryController extends Controller
{
    public function getHistory()
    {
        $history = print_job::all();
        return response()->json([
            'status' => 'success',
            'history' => $history,
            "message" => "Lấy dữ liệu thành công",
        ]);
    }
    public function getHistoryOfStudent(Request $request)
    {

        $allHistory = [];  
        $user_id = $request->query('user_id');
        $document = Document::where('StudentID', $user_id)->get();
        foreach ($document as $d) {
            $history = print_job::where('DocumentID', $d->DocumentID)->first();
            array_push($allHistory, $history);
        }
        return response()->json([
            'status' => 'success',
            'history' => $allHistory,
        ]);
    }

    public function getHistoryByPrinter(Request $request)
    {
        $printer_id = $request->query('id');
        $history = print_job::where('PrinterID', $printer_id)->get();
        return response()->json([
            'status' => 'success',
            'history' => $history,
        ]);
    }
}
