<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\PrinterConfigurationController;



Route::post('/login', [AuthController::class, 'login']);
Route::get('/printers', [PrinterController::class, 'getPrinters']);
Route::post('/printers', [PrinterController::class, 'store']);
Route::put('/printers/{id}', [PrinterController::class, 'update']);
Route::get('/adminPrinters', [PrinterController::class, 'getAdminPrinters']);

Route::get('/printer-config', [PrinterConfigurationController::class, 'getConfig']);
Route::put('/update-num-pages', [PrinterConfigurationController::class, 'updateNumPages']);
Route::put('/update-config-date', [PrinterConfigurationController::class, 'updateConfigDate']);
Route::put('/update-allowed-file-types', [PrinterConfigurationController::class, 'updateAllowedFileTypes']);