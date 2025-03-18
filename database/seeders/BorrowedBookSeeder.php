<?php

namespace Database\Seeders;

use App\Models\BorrowedBook;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BorrowedBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BorrowedBook::create([
            'student_id' => 1, // A valid student ID from the students table
            'library_student_id' => null, // Set to null instead of an empty string
            'book_id' => 1, // A valid book ID from the books table
            'borrow_date' => Carbon::now(),
            'return_date' => Carbon::now()->addWeeks(2),
            'status' => 'Borrowed',
        ]);

        BorrowedBook::create([
            'student_id' => null, // Set to null instead of an empty string
            'library_student_id' => 1, // A valid library student ID
            'book_id' => 2, // A valid book ID
            'borrow_date' => Carbon::now(),
            'return_date' => Carbon::now()->addWeeks(3),
            'status' => 'Borrowed',
        ]);
    }
}
