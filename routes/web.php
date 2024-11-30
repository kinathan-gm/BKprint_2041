<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');

