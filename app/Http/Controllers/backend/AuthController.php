<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{
    // Login method for Admin
    public function adminLogin(Request $request)
    {
        // Validate request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists, role is admin, and password is correct
        if (!$user || $user->user_role != 1 || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials or not an admin'], 401);
        }

        // Generate token
        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
            'message' => 'Admin logged in successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Login method for Member
    public function memberLogin(Request $request)
    {
        // Validate request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists, role is member, and password is correct
        if (!$user || $user->user_role != 3 || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials or not a member'], 401);
        }

        // Generate token
        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
            'message' => 'Member logged in successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Register method (Admin and Member Registration)
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'user_role' => 'required|in:1,2,3' // Admin (1) or Member (2)
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'user_role' => $request->user_role, // Accept user_role from the request
        ]);

        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Logout method
    public function logout(Request $request)
    {
        $user = $request->user();

        // Get the user's role name using the relationship
        $roleName = $user->role ? strtolower($user->role->name) : 'user';

        // Delete the user's tokens
        $user->tokens()->delete();

        // Return a dynamic logout message based on the user's role
        return response()->json([
            'message' => "The $roleName was logged out!"
        ]);
    }
}














// class AuthController extends Controller
// {
//     public function login(Request $request){
//         $user = User::where('email',$request->email)->first();
//         $token = $user->createToken($user->name)->plainTextToken;
        
//         if(! $user || ! Hash::check($request->password,$user->password)){
//                 return "User password or email is inccorect!!!";
//             }
            
//         $data = [
//             'user'=>$user,
//             'token'=>$token
//         ];
//         return $data;
//     }

//     public function register(Request $request){
//         $user = User::create([
//             'name'=>$request->name,
//             'email'=>$request->email,
//             'password'=>bcrypt($request->password),
//             'user_role'=>1,
//         ]);

//         $data = [
//             'user' => $user,
//             'token' => $user->createToken($user->name)->plainTextToken
//         ];

//         return $data;
//     }


//     public function logout(Request $request){
//         $user=$request->user();
//         $user->tokens()->delete();

//         return "user logouted!!!";
//     }
// }
