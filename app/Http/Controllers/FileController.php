<?php


namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function download($filename)
{
    $filePath = storage_path("app/public/uploads/$filename");

    if (!file_exists($filePath)) {
        return response()->json([
            'message' => 'Tệp không tồn tại.'
        ], 404);
    }
    $cleanedFilename = pathinfo($filename, PATHINFO_FILENAME);
    print($cleanedFilename);
    return response()->download($filePath, $cleanedFilename);
}
}
