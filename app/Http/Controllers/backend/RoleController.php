<?php

namespace App\Http\Controllers\backend;

use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json(['roles' => $roles], 200);
    }

    public function create()
    {
        return response()->json(['message' => 'Provide role data to create a new role.'], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        $role = Role::create(['name' => $request->name]);

        return response()->json(['message' => 'Role created successfully.', 'role' => $role], 201);
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);

        return response()->json(['role' => $role], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $id,
        ]);

        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name]);

        return response()->json(['message' => 'Role updated successfully.', 'role' => $role], 200);
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json(['message' => 'Role deleted successfully.'], 200);
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        $permissions = Permission::all();
        $rolePermissions = $role->permissions->pluck('id')->toArray();

        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
        ], 200);
    }

    public function assign(Request $request, $id)
    {
        $request->validate([
            'permission' => 'required|array',
        ]);

        $role = Role::findOrFail($id);
        $role->permissions()->sync($request->permission);

        Artisan::call('permission:cache-reset');

        return response()->json(['message' => 'Permissions updated successfully.'], 200);
    }
}
