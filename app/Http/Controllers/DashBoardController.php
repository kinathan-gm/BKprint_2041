<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Print_job;
use App\Models\Payment;
use App\Models\Printer;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function get()
    {
        $printJobCount = print_job::count();
        $printJobCompletedCount = print_job::whereNotNull('EndTime')->count();

        $totalPages = print_job::sum('PagesPrinted');
        $totalIncome = Payment::sum('Amount');

        $Income8 = Payment::whereMonth('Date', 8)->sum('amount');
        $Income9 = Payment::whereMonth('Date', 9)->sum('amount');
        $Income10 = Payment::whereMonth('Date', 10)->sum('amount');
        $Income11 = Payment::whereMonth('Date', 11)->sum('amount');
        $Income12 = Payment::whereMonth('Date', 12)->sum('amount');

        $printers = Printer::select('Brand', 'Model')->get();


        return response()->json([
            'status' => 'success',
            'printJobCount' => $printJobCount,
            'printJobCompletedCount' => $printJobCompletedCount,
            'totalPages' => $totalPages,
            'totalIncome' => $totalIncome,
            'Income'
            => ['Income8' => $Income8,
            'Income9' => $Income9,
            'Income10' => $Income10,
            'Income11' => $Income11,
            'Income12' => $Income12,],
            'printers' => $printers,
        ]);
    }
}
