<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BorrowedBookResource;
use App\Models\BorrowedBook;
use Illuminate\Http\Request;

class BorrowedBookController extends Controller
{
    public function index()
    {
        $borrowedBooks = BorrowedBook::with(['student', 'libraryStudent', 'book'])->get();
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

        $borrowedBook = BorrowedBook::create($request->all());

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

        return new BorrowedBookResource($borrowedBook);
    }

    public function destroy(BorrowedBook $borrowedBook)
    {
        $borrowedBook->delete();
        return response()->json(['message' => 'Borrowed book record deleted successfully'], 200);
    }
}
