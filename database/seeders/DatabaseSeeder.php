<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Http\Controllers\backend\RoomController;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // 🔒 Disable foreign key checks to allow truncating in any order
        Schema::disableForeignKeyConstraints();

        // 🧹 Truncate all tables used in seeding
        \App\Models\BorrowedBook::truncate();
        \App\Models\LibraryStudent::truncate();
        \App\Models\Book::truncate();
        \App\Models\Library::truncate();
        \App\Models\Expense::truncate();
        \App\Models\Asset::truncate();
        \App\Models\Support::truncate();
        \App\Models\Complaint::truncate();
        \App\Models\Student::truncate();
        \App\Models\Room::truncate();
        \Spatie\Permission\Models\Permission::truncate();
        \App\Models\User::truncate();
        \Spatie\Permission\Models\Role::truncate();

        // 🔓 Re-enable foreign key checks
        Schema::enableForeignKeyConstraints();

        // 🚀 Run all individual seeders
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            PermissionSeeder::class,
            RoomSeeder::class,
            StudentSeeder::class,
            ComplaintSeeder::class,
            SupportSeeder::class,
            AssetSeeder::class,
            ExpenseSeeder::class,
            LibrarySeeder::class,
            BookSeeder::class,
            LibraryStudentSeeder::class,
            BorrowedBookSeeder::class,
        ]);
        // \App\Models\Student::factory(10)->create();

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
