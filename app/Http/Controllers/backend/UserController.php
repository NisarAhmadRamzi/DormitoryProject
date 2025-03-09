<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceAssign;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
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
            'role' => 'nullable|in:admin,second-admin,student', // Role should be a valid name, not an ID
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

        // Assign Role Using Spatie (defaults to 'student' if no role is provided)
        $role = $request->role ?? 'student'; // Default to 'student' if role is not provided

        $user->role = $role; // Store the role name in the users table

        // Save user and role
        $user->save(); // Save user once

        // Assign the role using Spatie (for model_has_roles table)
        $user->assignRole($role);

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
            'role' => 'nullable|in:admin,second-admin,student', // Role should be a valid name, not an ID
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
        $role = $request->role ?? 'student'; // Default to 'student' if no role is provided

        // Update the role in the users table
        $user->role = $role;

        // Save the user
        $user->save();

        // Sync role with Spatie (assign the new role to the user in the model_has_roles table)
        $user->syncRoles([$role]);

        // Return the updated user as a response (optional)
        return UserResource::make($user);
    }





    // Find the user by ID
    // $user = User::findOrFail($id);

    // Update the user with new data
    // if (isset($fields['name'])) $user->name = $fields['name'];
    // if (isset($fields['email'])) $user->email = $fields['email'];
    // if (isset($fields['password'])) $user->password = Hash::make($fields['password']);
    // if (isset($fields['role'])) $user->user_role = $fields['role'];
    // $user->save();


    //second method
    // $user = User::findOrFail($id);
    // $user->update($fields);

    // Return the updated user as a resource
    // return UserResource::make($user);


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


    //     public function test()
    // {
    //     $users = User::all()->map(function ($user) {
    //         $user->profile = $user->profile ? asset('storage/' . $user->profile) : null; // Full URL
    //         return $user;
    //     });

    //     return response()->json($users);
    // }
}



        // Assign Role Using Spatie (defaults to 'student' if no role is provided)
        // $user->assignRole($request->role ?? 'student');

        // Assign Role Using Spatie
        // if ($request->role) {
        //     $user->assignRole($request->role); // Assign role to user
        // } else {
        //     $user->assignRole('student'); // Assign role to user
        // }



        // public function updateUser(Request $request, $id)
        // {
        //     // Validate incoming data
        //     $fields = $request->validate([
        //         'name' => 'required',
        //         'email' => 'required|email',
        //         'password' => 'required|min:4',
        //         'cpassword' => 'required|same:password',
        //         'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:2048' // Ensure valid file type and size
        //     ]);
    
        //     // Find the user
        //     $user = User::findOrFail($id);
    
        //     // Delete the old profile picture if a new one is uploaded and the old one exists
        //     if ($request->hasFile('profile') && $user->profile) {
        //         // Delete the old profile picture from storage
        //         Storage::disk('public')->delete($user->profile);
        //     }
    
        //     // Update user fields
        //     $user->name = $request->name;
        //     $user->email = $request->email;
        //     $user->password = Hash::make($request->password);
    
        //     // Save the new profile picture if provided
        //     $file = $request->file('profile');
        //     $path = $file ? $file->store('uploads', 'public') : $user->profile; // Retain old profile if no new file is provided
        //     $user->profile = $path;
    
        //     // Save the updated user
        //     $user->save();
    
        //     // Return the updated user resource
        //     return UserResource::make($user);
        // }