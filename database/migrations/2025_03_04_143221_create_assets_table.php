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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity')->default(0); // Total asset quantity
            $table->text('description')->nullable();
            $table->integer('total_quantity')->default(0); // Total asset quantity
            $table->integer('total_amount_of_donations')->default(0); // Total cash received from supports
            $table->integer('total_amount_of_cash_before_expense')->default(0); // Total cash assets
            $table->integer('total_amount_of_cash_after_expense')->default(0); // Total cash assets

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('assets');
    }
};
