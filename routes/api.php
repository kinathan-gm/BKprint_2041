<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\PrintJobController;
use App\Http\Controllers\DocumentController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/printers', [PrinterController::class, 'getPrinters']);
Route::post('/documents', [DocumentController::class, 'store']);
Route::post('/print-jobs', [PrintJobController::class, 'store']);
