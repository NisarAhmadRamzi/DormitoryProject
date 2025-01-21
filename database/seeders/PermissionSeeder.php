<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'user view']);
        Permission::create(['name' => 'user create']);  
        Permission::create(['name' => 'user update']);
        Permission::create(['name' => 'user delete']);
        
        Permission::create(['name' => 'student view']);
        Permission::create(['name' => 'student create']);
        Permission::create(['name' => 'student update']);
        Permission::create(['name' => 'student delete']);

        Permission::create(['name' => 'room view']);
        Permission::create(['name' => 'room create']);
        Permission::create(['name' => 'room update']);
        Permission::create(['name' => 'room delete']);

        Permission::create(['name' => 'role view']);
        Permission::create(['name' => 'role create']);
        Permission::create(['name' => 'role update']);
        Permission::create(['name' => 'role delete']);

        Permission::create(['name' => 'profile view']);
        Permission::create(['name' => 'profile create']);
        Permission::create(['name' => 'profile update']);
        Permission::create(['name' => 'profile delete']);

        Permission::create(['name' => 'permission view']);
        Permission::create(['name' => 'permission create']);
        Permission::create(['name' => 'permission update']);
        Permission::create(['name' => 'permission delete']);

        Permission::create(['name' => 'fee view']);
        Permission::create(['name' => 'fee create']);
        Permission::create(['name' => 'fee update']);
        Permission::create(['name' => 'fee delete']);

        Permission::create(['name' => 'complaint view']);
        Permission::create(['name' => 'complaint create']);
        Permission::create(['name' => 'complaint update']);
        Permission::create(['name' => 'complaint delete']);
        }
}
