<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrintJob;

class PrintJobController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'DocumentID' => 'required|exists:documents,DocumentID',
            'PrinterID' => 'required|exists:printers,PrinterID',
            'PaperSize' => 'required|string|max:10',
            'Copies' => 'required|integer|min:1',
            'IsDoubleSided' => 'required|integer',
        ]);

        $printJob = PrintJob::create([
            'DocumentID' => $validatedData['DocumentID'],
            'PrinterID' => $validatedData['PrinterID'],
            'StartTime' => now(),
            'EndTime' => now()->addMinutes(15),
            'PaperSize' => $validatedData['PaperSize'],
            'PagesPrinted' => 2,
            'Copies' => $validatedData['Copies'],
            'IsDoubleSided' => $validatedData['IsDoubleSided'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Yêu cầu in đã được gửi đi thành công!',
            'printJobID' => $printJob->PrintJobID
        ]);
    }

    // public function index()
    // {
    //     $printJobs = PrintJob::with(['printer', 'document'])->get();

    //     $response = $printJobs->map(function($job) {
    //         return [
    //             'PrintJobID' => $job->PrintJobID,
    //             'PrinterID' => $job->PrinterID,
    //             'DocumentID' => $job->DocumentID,
    //             'StartTime' => $job->StartTime,
    //             'EndTime' => $job->EndTime,
    //             'PaperSize' => $job->PaperSize,
    //             'PagesPrinted' => $job->PagesPrinted,
    //             'Copies' => $job->Copies,
    //             'IsDoubleSided' => $job->IsDoubleSided,
    //         ];
    //     });

    //     return response()->json([
    //         'status' => 'success',
    //         'printJobs' => $response,
    //     ]);
    // }

    // public function update(Request $request, $id)
    // {
    //     $validatedData = $request->validate([
    //         'EndTime' => 'required|date',
    //         'PagesPrinted' => 'required|integer|min:1',
    //     ]);

    //     $printJob = PrintJob::findOrFail($id);
    //     $printJob->update([
    //         'EndTime' => $validatedData['EndTime'],
    //         'PagesPrinted' => $validatedData['PagesPrinted'],
    //     ]);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Trạng thái yêu cầu in đã được cập nhật!',
    //     ]);
    // }

    // public function destroy($id)
    // {
    //     $printJob = PrintJob::findOrFail($id);
    //     $printJob->delete();

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Yêu cầu in đã được xoá!',
    //     ]);
    // }
}