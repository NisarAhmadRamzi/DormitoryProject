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
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id'); // Foreign key to students

            // Office payment amount, with a default value
            $table->decimal('office_pay', 10, 0)->default(1000);

            // Payment status or amount paid: can hold text or numeric values
            $table->string('office_paid')->default('Not Paid');

            // Total fee, typically equal to office_pay
            $table->decimal('warranty_pay', 10, 0)->default(1000);

            $table->string('warranty_paid')->default('Not Paid');


            $table->decimal('total_fee', 10, 0);

            // Registration date fetched from the students table
            $table->date('registration_date');

            // Paid date: can hold a specific date or be null
            $table->date('paid_date')->nullable();

            // Due date: manually settable by the user
            $table->date('due_date');

            // Created_at and updated_at timestamps
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fees');
    }
};
