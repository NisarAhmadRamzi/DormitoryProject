<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;



class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fetch roles by name
        $adminRole = Role::where('name', 'admin')->first();
        $secondAdminRole = Role::where('name', 'second-admin')->first();
        // $studentRole = Role::where('name', 'student')->first();

        // Creating users and assigning roles
        User::create([
            'name' => 'ramzi',
            'email' => 'ramzi@gmail.com',
            'password' => Hash::make('12345678'),
            'profile' => 'uploads/1.jpeg'
        ]);

        User::create([
            'name' => 'sirath',
            'email' => 'sirath@gmail.com',
            'password' => Hash::make('12345678'),
            'profile' => 'uploads/2.jpg'
        ]);

        User::create([
            'name' => 'allama',
            'email' => 'allama@gmail.com',
            'password' => Hash::make('12345678'),
            'profile' => 'uploads/3.jpg'
        ]);

        // User::create([
        //     'name' => 'nader',
        //     'email' => 'nader@gmail.com',
        //     'password' => Hash::make('12345678'),
        //     'profile' => 'uploads/3.jpg'
        // ]);

        // Assign roles to users
        $adminUser1 = User::find(1); // Replace with your admin user ID
        $adminUser2 = User::find(2);
        $secondAdminUser = User::find(3); // Replace with your editor user ID
        // $studentUser = User::find(4);

        if ($adminUser1) {
            $adminUser1->assignRole($adminRole);
        }

        if ($adminUser2) {
            $adminUser2->assignRole($adminRole);
        }

        if ($secondAdminUser) {
            $secondAdminUser->assignRole($secondAdminRole);
        }

        // if ($studentUser) {
        //     $studentUser->assignRole($studentRole);
        // }

    }
}
