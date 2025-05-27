<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceAssign;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4',
            'cpassword' => 'required|same:password',
            'role' => 'nullable|in:admin,second_admin,student',
            'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        if ($request->hasFile('profile')) {
            $path = $request->file('profile')->store('uploads', 'public');
            $user->profile = $path;
        } else {
            $user->profile = 'uploads/default.png';
        }

        $user->save();

        // Assign role using Spatie
        $role = $request->role ?? 'student'; // Default to 'student' if not provided
        $user->assignRole($role);

        return UserResource::make($user);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:4',
            'cpassword' => 'nullable|same:password',
            'role' => 'nullable|in:admin,second_admin,student',
            'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048'
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('profile')) {
            if ($user->profile && Storage::disk('public')->exists($user->profile)) {
                Storage::disk('public')->delete($user->profile);
            }
            $path = $request->file('profile')->store('uploads', 'public');
            $user->profile = $path;
        }

        $user->save();

        // Sync roles if provided
        if ($request->role) {
            $user->syncRoles($request->role);
        }

        return UserResource::make($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->profile) {
            Storage::disk('public')->delete($user->profile);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();
        return response()->json([
            'user' => $user,
            'roles' => $roles,
        ], 200);
    }

    public function assign(Request $request, $id)
    {
        $request->validate(['role' => 'required|exists:roles,id']);
        $user = User::findOrFail($id);
        $user->roles()->sync([$request->role]);
        return UserResourceAssign::make($user);
    }
}
