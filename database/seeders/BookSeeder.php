<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Book::create([
            'library_id' => 1, // assuming 1 is the ID for 'Central Library'
            'title' => 'The Divan of Hafez',
            'author' => 'Hafez',
            'publication_year' => '1370',
            'status' => 'Available',
            'books_total_count' => 2,
        ]);

        Book::create([
            'library_id' => 1, // assuming 1 is the ID for 'Central Library'
            'title' => 'Shahnameh',
            'author' => 'Ferdowsi',
            'publication_year' => '1010',
            'status' => 'Available',
            'books_total_count' => 4,
        ]);

        Book::create([
            'library_id' => 1, // assuming 1 is the ID for 'Central Library'
            'title' => 'The Conference of the Birds',
            'author' => 'Attar of Nishapur',
            'publication_year' => '1177',
            'status' => 'Available',
            'books_total_count' => 5,
        ]);

        Book::create([
            'library_id' => 1, // assuming 1 is the ID for 'Central Library'
            'title' => 'The Rubaiyat of Omar Khayyam',
            'author' => 'Omar Khayyam',
            'publication_year' => '1120',
            'status' => 'Available',
            'books_total_count' => 3,
        ]);
        Book::create([
            'library_id' => 1, // assuming 1 is the ID for 'Central Library'
            'title' => 'Introduction to Programming',
            'author' => 'John Doe',
            'publication_year' => '2020',
            'status' => 'Available',
            'books_total_count' => 2,
        ]);

        Book::create([
            'library_id' => 1, // assuming 2 is the ID for 'Community Library'
            'title' => 'Advanced Data Structures',
            'author' => 'Jane Smith',
            'publication_year' => '2021',
            'status' => 'Available',
            'books_total_count' => 1,
        ]);
    }
}
