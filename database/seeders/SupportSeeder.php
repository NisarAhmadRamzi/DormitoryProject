<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('supports')->insert([
            [
                'type' => 'Cash',
                'details' => 'this is a cash donation for fanos dormitory',
                'goods_quantity' => 0,
                'cash_quantity' => 10000,
                'helper_fullname' => 'Soroush Saffari',
                'helper_number' => '1234567890',
                'helper_email' => 'soroush@example.com',
                'help_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'Books',
                'details' => 'Donation of books for the library of dormitory.',
                'goods_quantity' => 100,
                'cash_quantity' => 0,
                'helper_fullname' => 'Nader Tabish',
                'helper_number' => '0987654321',
                'helper_email' => 'tabish@example.com',
                'help_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
