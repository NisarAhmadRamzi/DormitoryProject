<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;



class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Creating roles
        $roles = [
            ['name' => 'admin', 'guard_name' => 'sanctum'],
            ['name' => 'second_admin', 'guard_name' => 'sanctum'],
            ['name' => 'student', 'guard_name' => 'sanctum'],
            ['name' => 'library_admin', 'guard_name' => 'sanctum'],
            ['name' => 'library_student', 'guard_name' => 'sanctum']
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
