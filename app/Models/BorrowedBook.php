<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class BorrowedBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'library_student_id',
        'book_id',
        'borrow_date',
        'return_date',
        'status',
        'borrowed_books_total_count',
        'books_total_count',
        'books_total_count_after_borrowed'
    ];

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

    public static function boot()
    {
        parent::boot();

        // Auto-update counts when a record is created, updated, or deleted
        static::created(function ($borrowedBook) {
            $borrowedBook->updateCounts();
            $borrowedBook->updateBookModel();
        });

        static::updated(function ($borrowedBook) {
            $borrowedBook->updateCounts();
            $borrowedBook->updateBookModel();
        });

        static::deleted(function ($borrowedBook) {
            $borrowedBook->updateCounts();
            $borrowedBook->updateBookModel();
        });
    }


    /**
     * Dynamically update borrowed book counts.
     */
    public function updateCounts()
    {
        $borrowedCount = BorrowedBook::where('book_id', $this->book_id)->count();
        $totalBooks = Book::where('id', $this->book_id)->value('books_total_count') ?? 0;

        // Ensure borrowed count does not exceed total books
        $borrowedCount = min($borrowedCount, $totalBooks);
        $remainingBooks = max(0, $totalBooks - $borrowedCount);

        // Update borrowed book details
        $this->updateQuietly([
            'borrowed_books_total_count' => $borrowedCount,
            'books_total_count' => $totalBooks,
            'books_total_count_after_borrowed' => $remainingBooks
        ]);

        // Update the book status
        $this->updateBookStatus();
    }

    /**
     * Synchronize counts to Book model.
     */
    public function updateBookModel()
    {
        $borrowedCount = BorrowedBook::where('book_id', $this->book_id)->count();
        $totalBooks = Book::where('id', $this->book_id)->value('books_total_count') ?? 0;


        $book = Book::find($this->book_id);
        if ($book) {
            $book->updateQuietly([
                'borrowed_books_total_count' => $borrowedCount,
            ]);
        }
    }

    /**
     * Dynamically update book status based on borrowed book count.
     */
    public function updateBookStatus()
    {
        $book = Book::find($this->book_id);
        if (!$book) {
            return;
        }

        $totalBooks = $book->books_total_count;
        $borrowedCount = BorrowedBook::where('book_id', $this->book_id)
            ->where('status', 'Borrowed')
            ->count();

        if ($borrowedCount >= $totalBooks) {
            $book->status = 'Not Available!!! all books loaned';
        } elseif ($this->status === 'Overdue') {
            $book->status = '100Af fine for delay';
        } else {
            $book->status = 'Available';
        }

        $book->save();
    }


    // public static function boot()
    // {
    //     parent::boot();

    //     // Auto-update counts when a record is created, updated, or deleted
    //     static::created(function ($borrowedBook) {
    //         $borrowedBook->updateCounts();
    //     });

    //     static::updated(function ($borrowedBook) {
    //         $borrowedBook->updateCounts();
    //     });

    //     static::deleted(function ($borrowedBook) {
    //         $borrowedBook->updateCounts();
    //     });
    // }

    // /**
    //  * Update borrowed book counts dynamically.
    //  */
    // public function updateCounts()
    // {
    //     $borrowedCount = BorrowedBook::where('book_id', $this->book_id)->count();
    //     $totalBooks = Book::where('id', $this->book_id)->value('books_total_count') ?? 0;

    //     // Ensure borrowed count does not exceed total books
    //     $borrowedCount = min($borrowedCount, $totalBooks);
    //     $remainingBooks = max(0, $totalBooks - $borrowedCount);

    //     // Update borrowed book details
    //     $this->updateQuietly([
    //         'borrowed_books_total_count' => $borrowedCount,
    //         'books_total_count' => $totalBooks,
    //         'books_total_count_after_borrowed' => $remainingBooks
    //     ]);

    //     // Update the book status
    //     $this->updateBookStatus();
    // }

    // /**
    //  * Dynamically update book status based on borrowed book status.
    //  */
    // public function updateBookStatus()
    // {
    //     $borrowedCount = BorrowedBook::where('book_id', $this->book_id)
    //         ->where('status', 'Borrowed')
    //         ->count();

    //     $book = Book::find($this->book_id);
    //     if (!$book) {
    //         return;
    //     }

    //     if ($this->status === 'Borrowed') {
    //         $book->status = 'Borrowed';
    //     } elseif ($this->status === 'Returned') {
    //         $book->status = $borrowedCount > 0 ? 'Borrowed' : 'Available';
    //     } elseif ($this->status === 'Overdue') {
    //         $book->status = '100Af fine for delay';
    //     }

    //     $book->save();
    // }
}

//------------------------------------------------------
// class BorrowedBook extends Model
// {
//     protected $fillable = [
//         'student_id',
//         'library_student_id',
//         'book_id',
//         'borrow_date',
//         'return_date',
//         'status',
//         'borrowed_books_total_count',
//         'books_total_count',
//         'books_total_count_after_borrowed',
//     ];

//     // A borrowed book belongs to one student (either dormitory or library student)
//     public function student()
//     {
//         return $this->belongsTo(Student::class);
//     }

//     // A borrowed book belongs to one library student
//     public function libraryStudent()
//     {
//         return $this->belongsTo(LibraryStudent::class);
//     }

//     // A borrowed book belongs to one book
//     public function book()
//     {
//         return $this->belongsTo(Book::class);
//     }

//     public static function boot()
//     {
//         parent::boot();


//         static::created(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });

//         static::updated(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });

//         static::deleted(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });
//     }

//     public function updateCounts()
//     {
//         // Count how many times this book has been borrowed
//         $borrowedCount = BorrowedBook::where('book_id', $this->book_id)->count();

//         // Fetch total books available from the Books table (ensuring it comes from BookSeeder)
//         $totalBooks = Book::where('id', $this->book_id)->value('books_total_count');

//         // Ensure that totalBooks is not null (handle missing data case)
//         $totalBooks = $totalBooks ?? 0;

//         // Calculate remaining books
//         $remainingBooks = max(0, $totalBooks - $borrowedCount);

//         // Update BorrowedBook dynamically
//         $this->updateQuietly([
//             'borrowed_books_total_count' => $borrowedCount,
//             'books_total_count' => $totalBooks,  // ✅ Now correctly fetched from BookSeeder
//             'books_total_count_after_borrowed' => $remainingBooks
//         ]);

//         // Also update the status of the book
//         $this->updateBookStatus();
//     }

//     public function updateBookStatus()
//     {
//         if ($this->status === 'Borrowed') {
//             Book::where('id', $this->book_id)->update(['status' => 'Borrowed']);
//         } elseif ($this->status === 'Returned') {
//             Book::where('id', $this->book_id)->update(['status' => 'Available']);
//         } elseif ($this->status === 'Overdue') {
//             Book::where('id', $this->book_id)->update(['status' => '100Af fine for delay']);
//         }

//         // If no borrowed copies are left, make the book available again
//         $borrowedCount = BorrowedBook::where('book_id', $this->book_id)
//             ->where('status', 'Borrowed')
//             ->count();

//         if ($borrowedCount == 0) {
//             Book::where('id', $this->book_id)->update(['status' => 'Available']);
//         }
//     }
// }


///-----------------------------------------
// class BorrowedBook extends Model
// {
//     protected $fillable = [
//         'student_id',
//         'library_student_id',
//         'book_id',
//         'borrow_date',
//         'return_date',
//         'status',
//         'borrowed_books_total_count',
//         'books_total_count',
//         'books_total_count_after_borrowed',
//     ];

//     public function student()
//     {
//         return $this->belongsTo(Student::class);
//     }

//     // A borrowed book belongs to one library student
//     public function libraryStudent()
//     {
//         return $this->belongsTo(LibraryStudent::class);
//     }

//     // A borrowed book belongs to one book
//     public function book()
//     {
//         return $this->belongsTo(Book::class);
//     }

//     public static function boot()
//     {
//         parent::boot();

//         static::created(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });

//         static::updated(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });

//         static::deleted(function ($borrowedBook) {
//             $borrowedBook->updateCounts();
//         });
//     }

//     public function updateCounts()
//     {
//         // Count how many times this book has been borrowed
//         $borrowedCount = BorrowedBook::where('book_id', $this->book_id)->count();

//         // Get total books available from Books table
//         $totalBooks = Book::where('id', $this->book_id)->value('books_total_count');

//         // Calculate books left after borrowing
//         $remainingBooks = max(0, $totalBooks - $borrowedCount);

//         // Update BorrowedBook
//         $this->updateQuietly([
//             'borrowed_books_total_count' => $borrowedCount,
//             'books_total_count' => $totalBooks,
//             'books_total_count_after_borrowed' => $remainingBooks
//         ]);

//         // Also update the status of the book
//         $this->updateBookStatus();
//     }

//     public function updateBookStatus()
//     {
//         if ($this->status === 'Borrowed') {
//             Book::where('id', $this->book_id)->update(['status' => 'Borrowed']);
//         } elseif ($this->status === 'Returned') {
//             Book::where('id', $this->book_id)->update(['status' => 'Available']);
//         } elseif ($this->status === 'Overdue') {
//             Book::where('id', $this->book_id)->update(['status' => '100Af fine for delay']);
//         }

//         // If all borrowed books are returned, make book Available
//         $borrowedCount = BorrowedBook::where('book_id', $this->book_id)
//             ->where('status', 'Borrowed')
//             ->count();

//         if ($borrowedCount == 0) {
//             Book::where('id', $this->book_id)->update(['status' => 'Available']);
//         }
//     }
// }
//------------------------------------------------------
// first version without calculation
// class BorrowedBook extends Model
// {
//     use HasFactory;

//     protected $fillable = ['student_id', 'library_student_id', 'book_id', 'borrow_date', 'return_date', 'status'];

//     // A borrowed book belongs to one student (either dormitory or library student)
//     public function student()
//     {
//         return $this->belongsTo(Student::class);
//     }

//     // A borrowed book belongs to one library student
//     public function libraryStudent()
//     {
//         return $this->belongsTo(LibraryStudent::class);
//     }

//     // A borrowed book belongs to one book
//     public function book()
//     {
//         return $this->belongsTo(Book::class);
//     }

//     // Automatically update the book's status when a BorrowedBook is created or updated
//     protected static function boot()
//     {
//         parent::boot();

//         static::creating(function ($borrowedBook) {
//             $borrowedBook->updateBookStatus();
//         });

//         static::updating(function ($borrowedBook) {
//             $borrowedBook->updateBookStatus();
//         });
//         static::created(function ($borrowedBook) {
//             $borrowedBook->updateBookStatus();
//         });

//         static::updated(function ($borrowedBook) {
//             $borrowedBook->updateBookStatus();
//         });

//         static::deleted(function ($borrowedBook) {
//             $borrowedBook->book->update(['status' => 'Available']);
//         });
//     }

//     public function updateBookStatus()
//     {
//         if ($this->book) {
//             if ($this->status === 'Borrowed') {
//                 $this->book->update(['status' => 'Borrowed']);
//             } elseif ($this->status === 'Returned') {
//                 $this->book->update(['status' => 'Available']);
//             } elseif ($this->status === 'Overdue') {
//                 $this->book->update(['status' => '100Af fine for delay']);
//             }
//         }
//     }
// }
