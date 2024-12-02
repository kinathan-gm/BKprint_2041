<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Spso;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\MockObject\Builder\Stub;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'userType' => 'required|string|in:student,spso',
        ]);

        if ($request->userType === 'student') {
            $user = Student::where('Email', $request->username)->first();
            $userID = $user->StudentID;
        } else {
            $user = Spso::where('Email', $request->username)->first();
            $userID = $user->SPSOID;
        }
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'userType' => $request->userType,
                'user_id' => $userID,
            ]);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }
    }
}
