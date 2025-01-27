<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user =User::where('name','nader')->first();
        $room = Room::where('room_number',301)->first();

        Student::create([
            'name' => 'nader',
            'f_name' => 'Hassan',
            'last_name' => 'Tabish',
            'email' => 'nader@gmail.com',
            'password' => '123456789',
            'from' => 'Ghazni',
            'dob' => '2000-01-01',
            'id_number' => '123456789',
            'academic_info' => 'Student of university',
            'phone' => '0796388095',
            'registration_date' => '2024-01-01',
            'registration_deadline' => '2024-06-06',
            'gender' => 'Male',
            // 'user_id' => $user->id,
            'room_id' => $room->id, // Ensure a room with ID 1 exists in the rooms table
        ]);
    }
}
