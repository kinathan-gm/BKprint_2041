<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\StudentController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/printers', [PrinterController::class, 'getPrinters']);
Route::get('/spso/history', [HistoryController::class, 'getHistory']);
Route::get('/student/history', [HistoryController::class, 'getHistoryOfStudent']);

Route::get('/document', [DocumentController::class, 'getDocumentByID']);
Route::get('/printer', [PrinterController::class, 'getPrinterByID']);

Route::get('/getStudents', [StudentController::class, 'getStudent']);
Route::get('/getStudent', [StudentController::class, 'getStudentByID']);