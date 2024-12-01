<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function getDocument()
    {
        $document = Document::all();
        return $document;
    }
    public function getDocumentByID(Request $request)
    {
        $id = $request->query('id');
        $document = Document::find($id);  
        if (!$document) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tài liệu không tồn tại',
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'document' => $document,
        ]);
    }
}
