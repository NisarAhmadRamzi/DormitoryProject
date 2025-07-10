<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class BookController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all books')->only(['index']);
        $this->middleware('permission:view book')->only(['show']);
        $this->middleware('permission:create book')->only(['store']);
        $this->middleware('permission:edit book')->only(['update']);
        $this->middleware('permission:delete book')->only(['destroy']);
    }

    // Get all books
    public function index()
    {
        $books = Book::all();
        return BookResource::collection($books);
    }

    // Show a single book
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    // Store a new book
    public function store(Request $request)
    {
        $request->validate([
            'library_id' => 'required|exists:libraries,id',
            'title' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'author' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'publication_year' => 'required|date_format:Y',
            'status' => 'required|in:Available,Borrowed',
            'books_total_count' => 'required|integer|min:1',
        ]);

        $book = Book::create($request->all());
        return new BookResource($book);
    }

    // Update an existing book
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'library_id' => 'required|exists:libraries,id',
            'title' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'author' => 'required|string|max:255|regex:/[a-zA-Z]/',
            'publication_year' => 'required|date_format:Y',
            'status' => 'required|in:Available,Borrowed',
            'books_total_count' => 'required|integer|min:1',
        ]);

        $book->update($request->all());
        return new BookResource($book);
    }

    // Delete a book
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }
}
