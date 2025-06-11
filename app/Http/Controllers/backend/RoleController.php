<?php

namespace App\Http\Controllers\backend;

use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResourceAssign;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all roles')->only(['index']);
        $this->middleware('permission:view role')->only(['show']);
        $this->middleware('permission:create role')->only(['store']);
        $this->middleware('permission:edit role')->only(['update']);
        $this->middleware('permission:assign role permissions')->only(['assign']);
        $this->middleware('permission:delete role')->only(['destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        // return response()->json(['roles' => $roles], 200);
        return RoleResource::collection($roles);
    }

    // public function create()
    // {
    //     return response()->json(['message' => 'Provide role data to create a new role.'], 200);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        $role = Role::create(['name' => $request->name]);

        // return response()->json(['message' => 'Role created successfully.', 'role' => $role], 201);
        return RoleResource::make($role);
    }

    // public function edit($id)
    // {
    //     $role = Role::findOrFail($id);

    //     return response()->json(['role' => $role], 200);
    // }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $id,
        ]);

        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name]);

        // return response()->json(['message' => 'Role updated successfully.', 'role' => $role], 200);
        return RoleResource::make($role);
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
            // 'rolePermissions' => $rolePermissions,
        ], 200);
    }

    public function assign(Request $request, $id)
    {
        $request->validate([
            'permission' => 'required|array',
        ]);

        $role = Role::findOrFail($id);
        $role->permissions()->sync($request->permission);

        // Artisan::call('permission:cache-reset');

        // return response()->json(['message' => 'Permissions updated successfully.'], 200);
        return RoleResourceAssign::make($role);
    }
}
// 'user' => $user->load('roles'), 