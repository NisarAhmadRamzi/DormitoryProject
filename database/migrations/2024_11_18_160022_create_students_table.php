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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('f_name');
            $table->string('last_name');
            $table->string('email')->unique(); // Email must be unique and linked to users
            $table->string('password');
            $table->string('from');
            $table->date('dob');
            $table->integer('id_number')->unique(); // ID number must be unique
            $table->enum('academic_info', ['School_Student', 'University_Student', 'Kankor_Student', 'Course_Student']);
            $table->unsignedBigInteger('phone'); // Phone number must be unique
            $table->date('registration_date');
            $table->date('registration_deadline');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            // $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
};
