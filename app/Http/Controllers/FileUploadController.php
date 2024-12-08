<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    /**
     * Handle the file upload request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {

        if ($request->hasFile('file')) {

            $file = $request->file('file');
            $studentID = $request->input('studentId');
            $fileName = $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $fileName, 'public');

            return response()->json([
                'message' => 'Tệp đã được tải lên thành công.',
                'file' => $path,
            ], 200);
        }

        return response()->json([
            'message' => 'Không có tệp nào được gửi.',
        ], 400);
    }
}
