<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        // Validate input
        $validatedData = $request->validate([
            'StudentID' => 'required|exists:students,StudentID', // Đảm bảo StudentID hợp lệ
            'FileName' => 'required|string|max:255', // Tên file
            'FileType' => 'required|string|max:10', // Loại file
        ]);

        // Lưu thông tin file vào database
        $document = Document::create([
            'StudentID' => $validatedData['StudentID'],
            'FileName' => $validatedData['FileName'],
            'FileType' => $validatedData['FileType'],
            'UploadedDate' => now(),
        ]);

        // Trả về phản hồi sau khi lưu
        return response()->json([
            'status' => 'success',
            'message' => 'Document saved successfully!',
            'DocumentID' => $document->DocumentID,
        ]);
    }
}