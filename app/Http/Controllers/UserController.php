<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:3', 'max:30'],
            'password' => ['required', 'string', 'min:6']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::where('username', $credentials['username'])->first();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'login successful.',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials.'
        ], 401);
    }

    public function register(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:3', 'max:30', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful.',
            'user' => $user,
            'token' => $token
        ], 201);
    }
}