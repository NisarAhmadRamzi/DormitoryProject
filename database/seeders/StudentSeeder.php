<?php

namespace Database\Seeders;

use App\Models\Fee;
use App\Models\Room;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure a room exists with the room number 301
        $room = Room::where('room_number', 301)->first();

        // Create a new student
        $student1 = Student::create([
            'name' => 'nader',
            'f_name' => 'Hassan',
            'last_name' => 'Tabish',
            'email' => 'nader@gmail.com',
            'password' => bcrypt('123456789'), // It's better to hash the password
            'from' => 'Ghazni',
            'dob' => '2000-01-01',
            'id_number' => '123456789',
            'academic_info' => 'Student of university',
            'phone' => '0796666095',
            'registration_date' => Carbon::now(), // Set to today'
            'registration_deadline' => Carbon::now()->addMonths(6), // Set to 6 months from now
            'gender' => 'Male',
            'room_id' => $room->id, // Ensure the room exists
        ]);

        // Now that the student is created, create a fee record associated with the student
        Fee::create([
            'student_id' => $student1->id, // Using the student ID from the newly created student
            'office_pay' => 1000,
            'office_paid' => '900', // You can keep this as a string or numeric value as per your requirement
            'warranty_pay' => 1000,
            'warranty_paid' => '900', // You can keep this as a string or numeric value as per your requirement
            'total_fee' => 1900,
            'registration_date' => $student1->registration_date, // Use the registration date of the student
            'due_date' => now()->addMonths(2), // Set due date to 2 months from now
        ]);



        $student2 = Student::create([
            'name' => 'ali',
            'f_name' => 'Hassan',
            'last_name' => 'qaderi',
            'email' => 'ali@gmail.com',
            'password' => bcrypt('123456789'), // It's better to hash the password
            'from' => 'Ghazni',
            'dob' => '2000-01-01',
            'id_number' => '123456789',
            'academic_info' => 'Student of university',
            'phone' => '0799738095',
            'registration_date' => Carbon::now(), // Set to today'
            'registration_deadline' => Carbon::now()->addMonths(6), // Set to 6 months from now
            'gender' => 'Male',
            'room_id' => $room->id, // Ensure the room exists
        ]);

        // Now that the student is created, create a fee record associated with the student
        Fee::create([
            'student_id' => $student2->id, // Using the student ID from the newly created student
            'office_pay' => 1000,
            'office_paid' => '500', // You can keep this as a string or numeric value as per your requirement
            'warranty_pay' => 1000,
            'warranty_paid' => '900', // You can keep this as a string or numeric value as per your requirement
            'total_fee' => 1400,
            'registration_date' => $student2->registration_date, // Use the registration date of the student
            'due_date' => now()->addMonths(6), // Set due date to 2 months from now
        ]);
    }
}
