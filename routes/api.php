<?php

use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrinterController;



Route::post('/login', [AuthController::class, 'login']);
Route::get('/printers', [PrinterController::class, 'getPrinters']);
Route::get('/students/{idStudent}/getBalancePage', [PaymentController::class, 'getBalancePage']);
Route::post('/students/{idStudent}/paymentPage', [PaymentController::class, 'paymentPage']);
