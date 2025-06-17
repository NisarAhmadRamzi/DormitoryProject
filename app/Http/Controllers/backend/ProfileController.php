<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\Region;

class ProfileController extends Controller
{

    // Get profile data
    public function show()
    {
        $user = Auth::user();
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'profile' => $user->profile,
        ]);
    }

    // Update profile information (name, email, region, photo)
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
            'profile' => 'nullable|image|max:2048',
        ]);

        $user = auth()->user();

        // Update profile picture
        if ($request->hasFile('profile')) {
            if ($user->profile && Storage::disk('public')->exists($user->profile)) {
                Storage::disk('public')->delete($user->profile);
            }
            $path = $request->file('profile')->store('uploads', 'public');
            $user->profile = $path;
        }

        // Update user fields
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'name' => $user->name,
            'email' => $user->email,
            'profile' => $user->profile,
        ]);
    }

    // Delete profile photo
    public function deletePhoto()
    {
        $user = auth()->user();

        if ($user->profile && Storage::disk('public')->exists($user->profile)) {
            Storage::disk('public')->delete($user->profile);
            $user->profile = '';
            $user->save();

            return response()->json(['message' => 'Profile photo deleted.']);
        }

        return response()->json(['error' => 'No profile photo to delete.'], 400);
    }

    // Handle password update
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.']);
    }
}
