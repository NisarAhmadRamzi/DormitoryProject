<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['library_id', 'title', 'author', 'publication_year', 'status'];

    // A book belongs to one library
    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    // A book can be borrowed many times
    public function borrowedBooks()
    {
        return $this->hasMany(BorrowedBook::class);
    }
}
