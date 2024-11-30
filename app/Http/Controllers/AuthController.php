<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Spso;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // Xác thực yêu cầu
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'userType' => 'required|string|in:student,spso', // Kiểm tra userType
        ]);

        // Xử lý đăng nhập cho sinh viên
        if ($request->userType === 'student') {
            $user = Student::where('Email', $request->username)->first();
        } else {
            // Xử lý đăng nhập cho quản trị viên spso
            $user = Spso::where('Email', $request->username)->first();
        }

        // Kiểm tra mật khẩu và trả về thông tin người dùng
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'userType' => $request->userType,
            ]);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }
    }
}
