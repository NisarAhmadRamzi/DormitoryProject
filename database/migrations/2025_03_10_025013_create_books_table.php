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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id')->constrained('libraries')->onDelete('cascade');
            $table->string('title');
            $table->string('author');
            $table->string('publication_year');
            $table->enum('status', ['Available', 'Borrowed', '100Af fine for delay']);

            $table->integer('books_total_count')->default(1);
            $table->unsignedInteger('borrowed_books_total_count')->default(0);
            $table->unsignedInteger('books_total_count_after_borrowed')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
