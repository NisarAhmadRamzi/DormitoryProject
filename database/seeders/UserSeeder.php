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
        $secondAdminRole = Role::where('name', 'second_admin')->first();
        $studentRole = Role::where('name', 'student')->first();
        $libraryAdminRole = Role::where('name', 'library_admin')->first();
        $libraryStudentRole = Role::where('name', 'library_student')->first();

        // Creating users and assigning roles
        $user1 = User::create([
            'name' => 'ramzi',
            'email' => 'ramzi@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $adminRole->name,
            'profile' => 'uploads/1.jpeg',
        ]);

        $user2 = User::create([
            'name' => 'sirath',
            'email' => 'sirath@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $adminRole->name,
            'profile' => 'uploads/2.jpg'
        ]);

        $user3 = User::create([
            'name' => 'allama',
            'email' => 'allama@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $adminRole->name,
            'profile' => 'uploads/3.jpg'
        ]);

        $user4 = User::create([
            'name' => 'secondAdmin',
            'email' => 'secondAdmin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $secondAdminRole->name,
            'profile' => 'uploads/4.jpg'
        ]);

        // $user5 = User::create([
        //     'name' => 'student',
        //     'email' => 'student@gmail.com',
        //     'password' => Hash::make('12345678'),
        //     'role' => $studentRole->name,
        //     'profile' => 'uploads/4.jpg'
        // ]);

        $user6 = User::create([
            'name' => 'libraryAdmin',
            'email' => 'libraryAdmin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $libraryAdminRole->name,
            'profile' => 'uploads/4.jpg'
        ]);
        // $user7 = User::create([
        //     'name' => 'libraryStudent',
        //     'email' => 'libraryStudent@gmail.com',
        //     'password' => Hash::make('12345678'),
        //     'role' => $libraryStudentRole->name,
        //     'profile' => 'uploads/4.jpg'
        // ]);

        $user8 = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => $adminRole->name,
            'profile' => 'uploads/4.jpg'
        ]);

        // Assign roles to users
        $user1->assignRole($adminRole);
        $user2->assignRole($adminRole);
        $user3->assignRole($adminRole);
        $user4->assignRole($secondAdminRole);
        $user5->assignRole($studentRole);
        $user6->assignRole($libraryAdminRole);
        $user7->assignRole($libraryStudentRole);
        $user8->assignRole($adminRole);











        // User::create([
        //     'name' => 'nader',
        //     'email' => 'nader@gmail.com',
        //     'password' => Hash::make('12345678'),
        //     'profile' => 'uploads/3.jpg'
        // ]);

        // // Assign roles to users
        // $adminUser1 = User::find(1); // Replace with your admin user ID
        // $adminUser2 = User::find(2);
        // $secondAdminUser = User::find(3); // Replace with your editor user ID
        // // $studentUser = User::find(4);

        // if ($adminUser1) {
        //     $adminUser1->assignRole($adminRole);
        // }

        // if ($adminUser2) {
        //     $adminUser2->assignRole($adminRole);
        // }

        // if ($secondAdminUser) {
        //     $secondAdminUser->assignRole($secondAdminRole);
        // }

        // if ($studentUser) {
        //     $studentUser->assignRole($studentRole);
        // }

    }
}
