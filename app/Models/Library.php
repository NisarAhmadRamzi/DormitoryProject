<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'location', 'contact_info'];

    // A library has many books
    // public function books()
    // {
    //     return $this->hasMany(Book::class);
    // }

    // // A library has many library students
    // public function libraryStudents()
    // {
    //     return $this->hasMany(LibraryStudent::class);
    // }
}
