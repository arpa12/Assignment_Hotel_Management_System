<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class GoogleAuthController extends Controller
{
    // Redirect to Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // Handle Google callback
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Check if user already exists
            $user = User::where('email', $googleUser->email)->first();

            // Ensure only users can log in via Google (Admins restricted)
            if ($user && $user->role === "admin") {
                return response()->json(['error' => 'Admins cannot log in via Google.'], 403);
            }

            // If user doesn't exist, create a new one
            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => Hash::make(uniqid()), // Random password
                    'role' => 'user', // ✅ Only users can log in via Google
                ]);
            }

            // Generate Sanctum token
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Login successful!',
                'user' => $user,
                'token' => $token
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Google login failed!',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
