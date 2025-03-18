<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::create([
            'type' => 'cash',
            'expense_cash' => 500,
            'goods_quantity' => null,
            'description' => 'Office rent payment',
            'expense_date' => now(),
        ]);

        Expense::create([
            'type' => 'goods',
            'expense_cash' => 200,
            'goods_quantity' => 3,
            'description' => 'Used 3 chairs',
            'expense_date' => now(),
        ]);
    }
}
