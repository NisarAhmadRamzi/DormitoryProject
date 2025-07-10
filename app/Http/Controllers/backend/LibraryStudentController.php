<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\LibraryStudentResource;
use App\Models\LibraryStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

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
            'id_number' => 'required|integer|unique:library_students,id_number|max:255',
            'academic_info' => 'required|in:School_Student,University_Student,Kankor_Student,Course_Student,Others',
            'phone' => 'required|integer',
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
            'id_number' => 'required|integer|unique:library_students,id_number,|max:255',
            'academic_info' => 'required|in:School_Student,University_Student,Kankor_Student,Course_Student,Others',
            'phone' => 'required|integer',
            'registration_date' => 'required|date',
            'registration_deadline' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
        ]);

        $data = $request->all();
        $data['library_id'] = 1;  // Force library_id to 1

        $libraryStudent->update($data);
        return new LibraryStudentResource($libraryStudent);
    }

    // Soft delete a library student
    public function destroy($id)
    {
        $student = LibraryStudent::find($id);

        if ($student) {
            $student->delete();
            return response()->json(['message' => "Library student {$id} soft deleted successfully!"]);
        }

        return response()->json(['message' => 'Library student not found'], 404);
    }

    // Restore a soft deleted library student
    public function restore($id)
    {
        $student = LibraryStudent::withTrashed()->findOrFail($id);
        $student->restore();
        return response()->json(['message' => "Library student {$id} restored successfully"]);
    }

    /**
     * Permanently delete a library student.
     */
    public function forceDelete($id)
    {
        $student = LibraryStudent::withTrashed()->findOrFail($id);
        $student->forceDelete();
        return response()->json(['message' => "Library student {$id} permanently deleted"]);
    }


    // Retrieve all library students (including soft deleted)
    public function allStudents()
    {
        $allStudents = LibraryStudent::withTrashed()->get();

        if ($allStudents->isEmpty()) {
            return response()->json([
                'message' => 'No library students found',
                'data' => []
            ], 200);
        }

        return response()->json($allStudents, 200);
    }

    // Retrieve a single trashed (soft deleted) library student
    public function trashedStudent($id)
    {
        $student = LibraryStudent::onlyTrashed()->where('id', $id)->first();
        if (!$student) {
            return response()->json(['message' => 'Library student not found in trashed records'], 404);
        }
        return response()->json($student, 200);
    }
    // Retrieve all trashed (soft deleted) library students
    public function trashedStudents()
    {
        $trashedStudents = LibraryStudent::onlyTrashed()->get();
        return response()->json([
            'trashed' => $trashedStudents
        ], 200);
    }
}
