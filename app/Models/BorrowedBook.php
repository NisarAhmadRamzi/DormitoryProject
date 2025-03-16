<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorrowedBook extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'library_student_id', 'book_id', 'borrow_date', 'return_date', 'status'];

    // A borrowed book belongs to one student (either dormitory or library student)
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // A borrowed book belongs to one library student
    public function libraryStudent()
    {
        return $this->belongsTo(LibraryStudent::class);
    }

    // A borrowed book belongs to one book
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    // Automatically update the book's status when a BorrowedBook is created or updated
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($borrowedBook) {
            $borrowedBook->updateBookStatus();
        });

        static::updating(function ($borrowedBook) {
            $borrowedBook->updateBookStatus();
        });
        static::created(function ($borrowedBook) {
            $borrowedBook->updateBookStatus();
        });

        static::updated(function ($borrowedBook) {
            $borrowedBook->updateBookStatus();
        });

        static::deleted(function ($borrowedBook) {
            $borrowedBook->book->update(['status' => 'Available']);
        });
    }

    public function updateBookStatus()
    {
        if ($this->book) {
            if ($this->status === 'Borrowed') {
                $this->book->update(['status' => 'Borrowed']);
            } elseif ($this->status === 'Returned') {
                $this->book->update(['status' => 'Available']);
            } elseif ($this->status === 'Overdue') {
                $this->book->update(['status' => '100Af fine for delay']);
            }
        }
    }
}
