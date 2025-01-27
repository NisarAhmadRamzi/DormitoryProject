<?php

namespace App\Http\Controllers\backend;

use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PermissionResource;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        // return response()->json(['permissions' => $permissions], 200);
        return PermissionResource::collection($permissions);
    }

    /**
     * Create a new permission (information endpoint).
     */
    // public function create()
    // {
    //     return response()->json(['message' => 'Provide data to create a new permission.'], 200);
    // }

    /**
     * Store a newly created permission in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:permissions,name',
        ]);

        $permission = Permission::create($request->only('name'));

        // return response()->json(['message' => 'Permission created successfully.', 'permission' => $permission], 201);
        return PermissionResource::make($permission);
    }

    /**
     * Display the specified permission.
     */
    public function show(string $id)
    {
        $permission = Permission::findOrFail($id);

        // return response()->json(['permission' => $permission], 200);
        return PermissionResource::make($permission);
    }

    /**
     * Show the form for editing the specified permission (information endpoint).
     */
    // public function edit(string $id)
    // {
    //     $permission = Permission::findOrFail($id);

    //     return response()->json(['permission' => $permission], 200);
    // }

    /**
     * Update the specified permission in storage.
     */
    public function update(Request $request, string $id)
    {
        $permission = Permission::findOrFail($id);

        $request->validate([
            'name' => 'required|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update($request->only('name'));

        // return response()->json(['message' => 'Permission updated successfully.', 'permission' => $permission], 200);
        return PermissionResource::make($permission);
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully.'], 200);
    }
}
