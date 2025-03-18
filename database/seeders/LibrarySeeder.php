<?php

namespace Database\Seeders;

use App\Models\Library;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Library::create([
            'name' => 'Fanos Library',
            'location' => 'TankTil   Barchi  Kabul  Afghanistan',
            'contact_info' => 'fanos@gmail.com',
        ]);
    }
}
