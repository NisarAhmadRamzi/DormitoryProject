<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\LibraryStudentResource;
use App\Models\LibraryStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class LibraryStudentController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all library students')->only(['index']);
        $this->middleware('permission:view library student')->only(['show']);
        $this->middleware('permission:create library student')->only(['store']);
        $this->middleware('permission:edit library student')->only(['update']);
        $this->middleware('permission:delete library student')->only(['destroy']);
    }
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
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:library_students,email',
            'password' => 'required|string|min:8',
            'address' => 'required|string',
            'id_number' => 'required|string|max:255',
            'academic_info' => 'nullable|string|max:255',
            'phone' => 'required|string',
            'registration_date' => 'required|date',
            'registration_deadline' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'membership_status' => 'required|in:Active,Expired',
        ]);

        $data = $request->all();
        $data['library_id'] = 1;  // Force library_id to 1

        $student = LibraryStudent::create($data);
        return new LibraryStudentResource($student);
    }

    // Update an existing library student
    public function update(Request $request, LibraryStudent $libraryStudent)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:library_students,email,' . $libraryStudent->id,
            'password' => 'nullable|string|min:8',
            'address' => 'required|string',
            'id_number' => 'required|string|max:255',
            'academic_info' => 'nullable|string|max:255',
            'phone' => 'required|string',
            'registration_date' => 'required|date',
            'registration_deadline' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'membership_status' => 'required|in:Active,Expired',
        ]);

        $data = $request->all();
        $data['library_id'] = 1;  // Force library_id to 1

        $libraryStudent->update($data);
        return new LibraryStudentResource($libraryStudent);
    }

    // Delete a library student
    public function destroy(LibraryStudent $libraryStudent)
    {
        $libraryStudent->delete();
        return response()->json(['message' => 'Library student deleted successfully.']);
    }
}
