<?php

namespace Database\Seeders;

use App\Models\LibraryStudent;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class LibraryStudentSeeder extends Seeder
{
    use HasRoles;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure role exists
        $LibraryStudentRole = Role::where('name', 'library_student')->first();

        // Create library students
        $LibraryStudent1 = LibraryStudent::create([
            'library_id' => 1,
            'name' => 'suhail',
            'last_name' => 'Ramzi',
            'email' => 'suhail@gmail.com',
            'password' => bcrypt('12345678'),
            'address' => 'Nowabad Ghazni Afghanistan',
            'phone' => '123-456-7890',
            'registration_date' => Carbon::now(),
            'registration_deadline' => Carbon::now()->addYear(),
            'gender' => 'Male',
            'membership_status' => 'Active',
        ]);

        $LibraryStudent2 = LibraryStudent::create([
            'library_id' => 1,
            'name' => 'adile',
            'last_name' => 'Azada',
            'email' => 'adile@gmail.com',
            'password' => bcrypt('12345678'),
            'address' => 'jebraeil Herat Afghanistan',
            'phone' => '987-654-3210',
            'registration_date' => Carbon::now(),
            'registration_deadline' => Carbon::now()->addYear(),
            'gender' => 'Male',
            'membership_status' => 'Active',
        ]);

        // Assign role to users
        // $LibraryStudent1->user?->assignRole('library_student');
        // $LibraryStudent2->user?->assignRole('library_student');

        // $LibraryStudent1->user->assignRole($LibraryStudentRole);
        // $LibraryStudent2->user->assignRole($LibraryStudentRole);

        //     $user1 = User::create([
        //         'name' => $LibraryStudent1->name,
        //         'email' => $LibraryStudent1->email,
        //         'password' => $LibraryStudent1->password,
        //         'role' => 'library_student',
        //     ]);

        //     $user2 = User::create([
        //         'name' => $LibraryStudent2->name,
        //         'email' => $LibraryStudent2->email,
        //         'password' => $LibraryStudent2->password,
        //         'role' => 'library_student',
        //     ]);

        //     // Assign roles to users
        //     $user1->assignRole($LibraryStudentRole);
        //     $user2->assignRole($LibraryStudentRole);
    }
}
