<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_number', 10);
            $table->enum('type', ['4 people', '6 people', '8 people']);
            $table->integer('capacity');
            $table->integer('current_occupancy')->default(0);
            $table->decimal('price', 10, 2); // Room price per month
            $table->enum('status', ['Available', 'Occupied'])->default('Available');
            $table->enum('floor', ['Third Floor', 'Fourth Floor']); // New floor column
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
