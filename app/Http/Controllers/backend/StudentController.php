<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Fee;
use App\Models\LibraryStudent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all students')->only(['index', 'allStudents', 'trashedStudents', 'trashedStudent']);
        $this->middleware('permission:view student')->only(['show']);
        $this->middleware('permission:create student')->only(['create', 'store']);
        $this->middleware('permission:edit student')->only(['edit', 'update']);
        $this->middleware('permission:delete student')->only(['destroy', 'forceDelete']);
        $this->middleware('permission:restore student')->only(['restore']);
    }

    public function index()
    {
        // Fetch all students and return them as a resource collection
        return StudentResource::collection(Student::all());
    }
    /**
     * Store a newly created student in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'f_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students'],
            'password' => ['required', 'string'],
            'from' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'date', 'before:today'],
            'id_number' => ['required', 'integer', 'digits_between:1,20'],
            'academic_info' => ['required', 'in:School_Student,University_Student,Kankor_Student,Course_Student'],
            'phone' => ['required', 'numeric', 'digits_between:10,15', 'unique:students'],
            'registration_date' => ['required', 'date'],
            'registration_deadline' => ['required', 'date', 'after_or_equal:registration_date'],
            'gender' => ['required', 'in:Male,Female,Other'],
            'room_id' => ['nullable', 'exists:rooms,id'],
        ]);

        // Create a new student record
        $student = Student::create($validatedData);

        // Auto-create a Fee record
        Fee::create([
            'student_id' => $student->id,
            'office_pay' => 1000,
            'office_paid' => 'Not Paid',
            'total_fee' => 1000,
            'registration_date' => $student->registration_date,
            'due_date' => now()->addMonths(2),
        ]);

        // Auto-create a matching LibraryStudent
        if (!LibraryStudent::where('email', $student->email)->exists()) {
            LibraryStudent::create([
                'name' => $student->name,
                'last_name' => $student->last_name,
                'email' => $student->email,
                'password' => bcrypt($student->password), // same password
                'address' => $student->from ?? 'Unknown',
                'id_number' => $student->id_number,
                'academic_info' => $student->academic_info,
                'phone' => $student->phone,
                'registration_date' => $student->registration_date,
                'registration_deadline' => $student->registration_deadline,
                'library_id' => 1, // Assuming library_id is always 1
            ]);
        }

        return new StudentResource($student);
    }


    /**
     * Display the specified student.
     */
    public function show(Student $student)
    {
        // Return the specified student as a resource
        return new StudentResource($student);
    }
    public function update(Request $request, Student $student)
    {
        // Save the original email before the student is updated
        $originalEmail = $student->email;

        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'f_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students,email,' . $student->id],
            'password' => ['nullable', 'string'], // Password can be null
            'from' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'date', 'before:today'],
            'id_number' => ['required', 'integer', 'digits_between:1,20'],
            'academic_info' => ['nullable', 'in:School_Student,University_Student,Kankor_Student,Course_Student'],
            'phone' => ['required', 'numeric', 'digits_between:10,15', 'unique:students'],
            'registration_date' => ['required', 'date'],
            'registration_deadline' => ['required', 'date', 'after_or_equal:registration_date'],
            'gender' => ['required', 'in:Male,Female,Other'],
            'room_id' => ['nullable', 'exists:rooms,id'],
        ]);

        // Handle password: hash if provided, else keep old
        if (isset($validatedData['password']) && $validatedData['password']) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        } else {
            $validatedData['password'] = $student->password;
        }

        // Update student
        $student->update($validatedData);

        // Update matching LibraryStudent using the original email
        $libraryStudent = LibraryStudent::where('email', $originalEmail)->first();
        if ($libraryStudent) {
            $libraryStudent->update([
                'name' => $validatedData['name'],
                'last_name' => $validatedData['last_name'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'], // already hashed
                'address' => $validatedData['from'],
                'id_number' => $validatedData['id_number'],
                'academic_info' => $validatedData['academic_info'],
                'phone' => $validatedData['phone'],
                'registration_date' => $validatedData['registration_date'],
                'registration_deadline' => $validatedData['registration_deadline'],
                'library_id' => 1, // You can change this if dynamic
            ]);
        }
        return new StudentResource($student);
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if ($student) {
            // Soft delete matching Fee(s)
            $fees = Fee::where('student_id', $student->id)->get();
            foreach ($fees as $fee) {
                $fee->delete();
            }

            // Soft delete matching LibraryStudent by email
            $libraryStudent = LibraryStudent::where('email', $student->email)->first();
            if ($libraryStudent) {
                $libraryStudent->delete();
            }

            // Soft delete the student
            $student->delete();

            return response()->json(['message' => "Student {$id} soft deleted successfully!"]);
        }

        return response()->json(['message' => 'Student not found'], 404);
    }



    public function restore($id)
    {
        $student = Student::withTrashed()->findOrFail($id);
        $student->restore();

        $libraryStudent = LibraryStudent::withTrashed()->where('email', $student->email)->first();
        if ($libraryStudent) {
            $libraryStudent->restore();
        }

        $user = User::withTrashed()->where('email', $student->email)->first();
        if ($user) {
            $user->restore();
        }

        return response()->json(['message' => "Student {$id} restored successfully"]);
    }


    public function forceDelete($id)
    {
        $student = Student::withTrashed()->findOrFail($id);

        // Also force delete matching LibraryStudent
        $libraryStudent = LibraryStudent::withTrashed()->where('email', $student->email)->first();
        if ($libraryStudent) {
            $libraryStudent->forceDelete();
        }

        // Also force delete matching User if exists (whether soft-deleted or not)
        $user = User::withTrashed()->where('email', $student->email)->first();
        if ($user) {
            $user->forceDelete();
        }

        $student->forceDelete();

        return response()->json(['message' => "Student {$id} permanently deleted"]);
    }


    public function trashedStudents()
    {
        $students = Student::onlyTrashed()->get();

        if ($students->isEmpty()) {
            return response()->json([
                'message' => 'No soft-deleted students found',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Trashed students retrieved successfully',
            'data' => $students
        ], 200);
    }

    // Retrieve All Students (Including Deleted)
    public function allStudents()
    {
        // Fetch all students, including soft-deleted ones
        $allStudents = Student::withTrashed()->get();

        // If no students found, return an empty array instead of an error
        if ($allStudents->isEmpty()) {
            return response()->json([
                'message' => 'No students found',
                'data' => []
            ], 200);
        }

        return response()->json($allStudents, 200);
    }


    public function trashedStudent($id)
    {
        $student = Student::onlyTrashed()->where('id', $id)->first();
        if (!$student) {
            return response()->json(['message' => 'Student not found in trashed records'], 404);
        }
        return response()->json($student, 200);
    }
}







  // public function trashedStudents()
    // {
    //     // Run a raw query to check if it returns data
    //     $students = DB::select("SELECT * FROM students WHERE deleted_at IS NOT NULL");

    //     return response()->json([
    //         'message' => 'Debugging raw SQL query',
    //         'data' => $students
    //     ], 200);
    // }