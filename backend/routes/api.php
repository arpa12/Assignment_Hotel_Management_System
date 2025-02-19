<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\GoogleAuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Logout & Get User Info Must Be in Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // ✅ Ensure this is included
    Route::get('/me', [AuthController::class, 'me']);
});

// Public Routes (Users can view hotels)
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/hotels', [HotelController::class, 'store']);   // Create
    Route::put('/hotels/{id}', [HotelController::class, 'update']); // Update
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy']); // Delete
});


Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
