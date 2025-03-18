<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\LibraryStudentResource;
use App\Models\LibraryStudent;
use Illuminate\Http\Request;

class LibraryStudentController extends Controller
{
    // Get all library students
    public function index()
    {
        $students = LibraryStudent::all();
        return LibraryStudentResource::collection($students);
    }

    // Show a single library student
    public function show(LibraryStudent $libraryStudent)
    {
        return new LibraryStudentResource($libraryStudent);
    }

    // Store a new library student
    public function store(Request $request)
    {
        $request->validate([
            'library_id' => 'required|exists:libraries,id',
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:library_students,email',
            'password' => 'required|string|min:8',
            'address' => 'required|string',
            'phone' => 'required|string',
            'registration_date' => 'required|date',
            'registration_deadline' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'membership_status' => 'required|in:Active,Expired',
        ]);

        $student = LibraryStudent::create($request->all());
        return new LibraryStudentResource($student);
    }

    // Update an existing library student
    public function update(Request $request, LibraryStudent $libraryStudent)
    {
        $request->validate([
            'library_id' => 'required|exists:libraries,id',
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:library_students,email,' . $libraryStudent->id,
            'password' => 'nullable|string|min:8',
            'address' => 'required|string',
            'phone' => 'required|string',
            'registration_date' => 'required|date',
            'registration_deadline' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'membership_status' => 'required|in:Active,Expired',
        ]);

        $libraryStudent->update($request->all());
        return new LibraryStudentResource($libraryStudent);
    }

    // Delete a library student
    public function destroy(LibraryStudent $libraryStudent)
    {
        $libraryStudent->delete();
        return response()->json(['message' => 'Library Student deleted successfully']);
    }
}
