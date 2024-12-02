<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Student;

class PaymentController extends Controller
{
    //
    public function getBalancePage($idStudent)
    {
        $student = Student::findOrFail($idStudent);
        return response()->json(['balancePage' => $student->PageBalance], 200);
    }
    public function paymentPage(Request $request, $idStudent)
    {
        // Tìm sinh viên theo ID hoặc trả về lỗi 404
        $student = Student::findOrFail($idStudent);

        // Lấy thông tin từ body request
        $amount = $request->input('amount');
        $paymentMethod = $request->input('paymentMethod');
        $page = $request->input('page');

        // Thực hiện các thao tác với thông tin nhận được
        $student->PageBalance += $page;
        $student->save();

        $payment = new Payment();
        $payment->PaymentMethod = $paymentMethod;
        $payment->StudentID = $idStudent;
        $payment->Amount = $amount;
        $payment->Date = now(); // Sử dụng thời gian hiện tại
        $payment->save();

        return response()->json(['message' => 'Payment successful'], 200);
    }
}
