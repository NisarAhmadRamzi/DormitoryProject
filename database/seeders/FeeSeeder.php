<?php

namespace Database\Seeders;

use App\Models\Fee;
use App\Models\Room;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // public function run(): void
    // {
    //     $student = Student::where('name', 'nader')->first();
    //     $room = Room::where('room_number', '301')->first();

    //     if ($student && $room) {
    //         Fee::create([
    //             'student_id' => $student->id,
    //             'amount' => $room->price, // Assuming 'price' exists in the Room model
    //             'status' => 'Paid',
    //             'due_date' => '2024-06-06',
    //             'paid_at' => '2024-01-01',
    //         ]);
    //     } else {
    //         if (!$student) {
    //             $this->command->warn("No student found with name 'nader'. Please seed the students table first.");
    //         }
    //         if (!$room) {
    //             $this->command->warn("No room found with room_number '301'. Please seed the rooms table first.");
    //         }}
    // }
}
