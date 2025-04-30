<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\SubscriptionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

Route::prefix('invoices')->group(function () {
    Route::get('/', [InvoiceController::class, 'index']);
    Route::post('/', [InvoiceController::class, 'store']);
    Route::put('/{invoice}/pay', [InvoiceController::class, 'pay']);
});

Route::prefix('subscriptions')->group(function () {
    Route::get('/', [SubscriptionsController::class, 'index']);
});