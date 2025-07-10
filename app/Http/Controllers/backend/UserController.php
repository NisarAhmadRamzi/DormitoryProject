<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceAssign;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all users')->only(['index']);
        $this->middleware('permission:view user')->only(['show']);
        $this->middleware('permission:create user')->only(['create', 'store']);
        $this->middleware('permission:edit user')->only(['edit', 'update', 'updateUser']);
        $this->middleware('permission:delete user')->only(['destroy']);
        $this->middleware('permission:assign user role')->only(['assign']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve paginated users with their profiles and roles
        $users = User::all();

        // Return users as a resource collection
        return UserResource::collection($users);

        // $users = User::all()->map(function ($user) {
        //     $user->profile = $user->profile ? asset('storage/' . $user->profile) : null; // Full URL
        //     return $user;
        // });

        // return response()->json($users);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4',
            'cpassword' => 'required|same:password',
            'role' => 'nullable|in:admin,second_admin,student,library_student,library_admin', // Role should be a valid name, not an ID
            'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048'
        ]);

        // Create user instance
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        // Handle Profile Image Upload
        if ($request->hasFile('profile')) {
            $file = $request->file('profile');
            $path = $file->store('uploads', 'public');
            $user->profile = $path;
        } else {
            $user->profile = 'uploads/default.png'; // Set default profile image
        }
        $user->role = $request->role;

        // Assign Role Using Spatie (defaults to 'student' if no role is provided)
        // $role = $request->role ?? 'student'; // Default to 'student' if role is not provided

        // $user->role = $role; // Store the role name in the users table

        // Save user and role
        $user->save(); // Save user once
        $user->assignRole($request->role);

        // Assign the role using Spatie (for model_has_roles table)
        // $user->assignRole($role);

        // Return user resource (optional)
        return UserResource::make($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Allow updating email but prevent duplicate
            'password' => 'nullable|min:4', // Password is optional during update
            'cpassword' => 'nullable|same:password', // Ensure confirmation matches if password is provided
            'role' => 'nullable|in:admin,second_admin,student,library_student,library_admin', // Role should be a valid name, not an ID
            'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048' // Profile image validation
        ]);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Update the user's name and email
        $user->name = $request->name;
        $user->email = $request->email;

        // Handle password update (only if provided)
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        // Handle Profile Image Update
        if ($request->hasFile('profile')) {
            // Delete old profile image if exists (optional, to avoid leftover files)
            if ($user->profile && file_exists(storage_path('app/public/' . $user->profile))) {
                unlink(storage_path('app/public/' . $user->profile));
            }

            // Store new profile image
            $file = $request->file('profile');
            $path = $file->store('uploads', 'public');
            $user->profile = $path; // Set new profile path
        }

        // Assign role using Spatie (defaults to 'student' if no role is provided)
        $user->role = $request->role;

        // Save the user
        $user->save();

        // Sync role with Spatie (assign the new role to the user in the model_has_roles table)
        $user->syncRoles($request->role);

        // Return the updated user as a response (optional)
        return UserResource::make($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the user or fail
        $user = User::findOrFail($id);
        // Delete the user's profile image if it exists
        if ($user->profile) {
            Storage::disk('public')->delete($user->profile);
        }

        // Delete the user
        $user->delete();
        return response()->json(['message' => 'User Soft deleted successfully'], 200);
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
    // Restore a soft deleted user
    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();
        return response()->json(['message' => "User {$id} restored successfully"]);
    }

    /**
     * Permanently delete a user.
     */
    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        // Delete the user's profile image if it exists
        if ($user->profile) {
            Storage::disk('public')->delete($user->profile);
        }
        $user->forceDelete();
        return response()->json(['message' => "User {$id} permanently deleted"]);
    }

    // Retrieve all users (including soft deleted)
    public function allUsers()
    {
        $allUsers = User::withTrashed()->get();

        if ($allUsers->isEmpty()) {
            return response()->json([
                'message' => 'No users found',
                'data' => []
            ], 200);
        }

        return response()->json($allUsers, 200);
    }

    // Retrieve a single trashed (soft deleted) user
    public function trashedUser($id)
    {
        $user = User::onlyTrashed()->where('id', $id)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found in trashed records'], 404);
        }
        return response()->json($user, 200);
    }

    // Retrieve all trashed (soft deleted) users
    public function trashedUsers()
    {
        $trashedUsers = User::onlyTrashed()->get();
        return response()->json([
            'trashed' => $trashedUsers
        ], 200);
    }

    /**
     * Assign a role to the specified user.
     */
    public function assign(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Validate the input
        $request->validate([
            'role' => 'required|exists:roles,id',
        ]);

        // Assign the role to the user
        $user->roles()->sync([$request->role]);

        // return response()->json([
        //     'message' => 'Role assigned successfully.',
        //     'user' => $user->load('roles'), // Include roles in the response
        // ], 200);
        return UserResourceAssign::make($user);
    }
}
