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
            ['name' => 'admin'],
            ['name' => 'second_admin'],
            ['name' => 'student'],
            ['name' => 'library_student']
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
