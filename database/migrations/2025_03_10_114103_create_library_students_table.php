<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('library_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id')->constrained('libraries')->onDelete('cascade');
            $table->string('name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('address');
            $table->integer('id_number')->unique(); // ID number must be unique
            $table->enum('academic_info', ['School_Student', 'University_Student', 'Kankor_Student', 'Course_Student', 'Others']);
            $table->unsignedBigInteger('phone'); // Phone number must be unique
            $table->date('registration_date');
            $table->date('registration_deadline');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('library_students');
    }
};
