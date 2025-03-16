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
        Schema::create('borrowed_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->nullable()->constrained('students')->onDelete('set null');
            $table->foreignId('library_student_id')->nullable()->constrained('library_students')->onDelete('set null');
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');
            $table->date('borrow_date');
            $table->date('return_date')->nullable();
            $table->enum('status', ['Borrowed', 'Returned', 'Overdue']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowed_books');
    }
};
