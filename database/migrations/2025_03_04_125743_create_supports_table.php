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
        Schema::create('supports', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Can be cash, food, furniture, etc.
            $table->text('details'); // Holds complete information about the support
            $table->integer('goods_quantity')->default(0)->nullable(); // Goods quantity (e.g., food packs)
            $table->integer('cash_quantity')->default(0)->nullable(); // Cash amount donated
            $table->string('helper_fullname');
            $table->string('helper_number');
            $table->string('helper_email')->nullable();
            $table->date('help_date'); // Date of donation
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('supports');
    }
};
