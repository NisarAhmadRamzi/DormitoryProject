<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['cash', 'goods']); // Expense type
            $table->integer('expense_cash')->nullable(); // Money spent
            $table->integer('goods_quantity')->nullable(); // Goods spent
            $table->text('description')->nullable();
            $table->date('expense_date'); // Date of expense

            // Auto-updating columns from other tables
            $table->integer('total_expense')->default(0); // Total expense
            $table->integer('total_quantity')->default(0); // From assets table
            $table->integer('total_amount_of_donations')->default(0); // From supports table
            $table->integer('total_amount_of_cash_before_expense')->default(0); // from  Total cash assets
            $table->integer('total_amount_of_cash_after_expense')->default(0); //  from Total cash assets

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expenses');
    }
};
