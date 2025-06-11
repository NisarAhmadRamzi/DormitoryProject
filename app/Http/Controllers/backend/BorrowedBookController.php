<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BorrowedBookResource;
use App\Models\Book;
use App\Models\BorrowedBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class BorrowedBookController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all borrowed books')->only(['index']);
        $this->middleware('permission:view borrowed book')->only(['show']);
        $this->middleware('permission:create borrowed book')->only(['store']);
        $this->middleware('permission:edit borrowed book')->only(['update']);
        $this->middleware('permission:delete borrowed book')->only(['destroy']);
    }

    public function index()
    {

        $borrowedBooks = BorrowedBook::with(['student', 'libraryStudent', 'book'])->latest()->get();
        // $borrowedBooks = BorrowedBook::with(['student', 'libraryStudent', 'book'])
        //     ->get()
        //     ->map(fn($borrowedBook) => $borrowedBook->fresh());
        return BorrowedBookResource::collection($borrowedBooks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'nullable|exists:students,id',
            'library_student_id' => 'nullable|exists:library_students,id',
            'book_id' => 'required|exists:books,id',
            'borrow_date' => 'required|date',
            'return_date' => 'nullable|date',
            'status' => 'required|in:Borrowed,Returned,Overdue',
        ]);

        $book = Book::findOrFail($request->book_id);
        // Ensure not exceeding available books
        if (BorrowedBook::where('book_id', $book->id)->count() >= $book->books_total_count) {
            return response()->json(['message' => 'Not enough books available to borrow'], 400);
        }
        $borrowedBook = BorrowedBook::create($request->all());
        $borrowedBook->updateCounts();

        return new BorrowedBookResource($borrowedBook);
    }

    public function show(BorrowedBook $borrowedBook)
    {
        return new BorrowedBookResource($borrowedBook);
    }

    public function update(Request $request, BorrowedBook $borrowedBook)
    {
        $request->validate([
            'status' => 'required|in:Borrowed,Returned,Overdue',
            'return_date' => 'nullable|date',
        ]);

        $borrowedBook->update($request->all());
        $borrowedBook->updateCounts();

        return new BorrowedBookResource($borrowedBook);
    }

    public function destroy(BorrowedBook $borrowedBook)
    {
        $borrowedBook->delete();
        return response()->json(['message' => 'Borrowed book record deleted successfully'], 200);
    }
}
