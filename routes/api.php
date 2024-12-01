<?php

use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PrinterController;

use App\Http\Controllers\StudentController;

use App\Http\Controllers\PrinterConfigurationController;




Route::post('/login', [AuthController::class, 'login']);
Route::get('/printers', [PrinterController::class, 'getPrinters']);

Route::get('/students/{idStudent}/getBalancePage', [PaymentController::class, 'getBalancePage']);
Route::post('/students/{idStudent}/paymentPage', [PaymentController::class, 'paymentPage']);


Route::get('/spso/history', [HistoryController::class, 'getHistory']);
Route::get('/student/history', [HistoryController::class, 'getHistoryOfStudent']);

Route::get('/document', [DocumentController::class, 'getDocumentByID']);
Route::get('/printer', [PrinterController::class, 'getPrinterByID']);

Route::get('/getStudents', [StudentController::class, 'getStudent']);
Route::get('/getStudent', [StudentController::class, 'getStudentByID']);

Route::post('/printers', [PrinterController::class, 'store']);
Route::put('/printers/{id}', [PrinterController::class, 'update']);
Route::get('/adminPrinters', [PrinterController::class, 'getAdminPrinters']);

Route::get('/printer-config', [PrinterConfigurationController::class, 'getConfig']);
Route::put('/update-num-pages', [PrinterConfigurationController::class, 'updateNumPages']);
Route::put('/update-config-date', [PrinterConfigurationController::class, 'updateConfigDate']);
Route::put('/update-allowed-file-types', [PrinterConfigurationController::class, 'updateAllowedFileTypes']);
