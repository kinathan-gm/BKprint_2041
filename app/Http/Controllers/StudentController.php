<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getStudent()
    {
        $student = Student::all();
        return $student;
    }
    public function getStudentByID(Request $request)
    {
        $id = $request->query('id');
        $student = Student::find($id);  
        if (!$student) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sinh viên không tồn tại',
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'student' => $student,
        ]);
    }
    public function getStudentByDocID(Request $request)
    {
        $id = $request->query('id');
        $student = Student::find($id);  
        if (!$student) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sinh viên không tồn tại',
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'student' => $student,
        ]);
    }
}
