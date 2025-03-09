<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Fee;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all students and return them as a resource collection
        // return StudentResource::collection(Student::all());
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

    /**
     * Store a newly created student in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'], // Name is required, should be a string, max length 255
            'f_name' => ['required', 'string', 'max:255'], // Father's name is required
            'last_name' => ['required', 'string', 'max:255'], // Last name is required
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students'], // Email is required, should be unique
            'password' => ['required', 'string'], // Password is required
            'from' => ['required', 'string', 'max:255'], // Place of origin is required
            'dob' => ['required', 'date', 'before:today'], // Date of birth should be before today
            'id_number' => ['required', 'integer', 'digits_between:1,20'], // National ID number, must be an integer
            'academic_info' => ['nullable', 'string'], // Academic information is optional
            'phone' => ['required', 'string', 'regex:/^[0-9]{10,15}$/'], // Phone number must be 10-15 digits
            'registration_date' => ['required', 'date'], // Registration date is required
            'registration_deadline' => ['required', 'date', 'after_or_equal:registration_date'], // Deadline must be on/after registration date
            'gender' => ['required', 'in:Male,Female,Other'], // Must be Male, Female, or Other
            // 'user_id' => ['required', 'exists:users,id'], // Must reference an existing user ID
            'room_id' => ['nullable', 'exists:rooms,id'], // If provided, must reference an existing room ID
        ]);

        // Create a new student record
        $student = Student::create($validatedData);
        Fee::create([
            'student_id' => $student->id,
            'office_pay' => 1000,
            'office_paid' => 'Not Paid',
            'total_fee' => 1000,
            'registration_date' => $student->registration_date,
            'due_date' => now()->addMonths(2), // Example: set due date to 1 month from now
        ]);

        // Return the created student as a resource
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

    /**
     * Update the specified student in storage.
     */
    public function update(Request $request, Student $student)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'f_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students,email,' . $student->id], // Ensure email is unique but ignore current student's email
            'password' => ['nullable', 'string'], // Password can be optional if not being updated
            'from' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'date', 'before:today'],
            'id_number' => ['required', 'integer', 'digits_between:1,20'],
            'academic_info' => ['nullable', 'string'],
            'phone' => ['required', 'string', 'regex:/^[0-9]{10,15}$/'],
            'registration_date' => ['required', 'date'],
            'registration_deadline' => ['required', 'date', 'after_or_equal:registration_date'],
            'gender' => ['required', 'in:Male,Female,Other'],
            'room_id' => ['nullable', 'exists:rooms,id'],
        ]);

        // Check if a new password is provided; if not, retain the current hashed password
        if (isset($validatedData['password']) && $validatedData['password']) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        } else {
            $validatedData['password'] = $student->password;
        }

        // Update the student record
        $student->update($validatedData);

        // Find the associated user using the original email
        $user = User::where('email', $student->getOriginal('email'))->first();

        if ($user) {
            // Update the user's information
            $user->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'], // Already hashed or retained
            ]);

            // Ensure the user retains the 'student' role
            if (!$user->hasRole('student')) {
                $user->assignRole('student');
            }
        }
        $fee = $student->fees;
        if ($fee) {
            $fee->update([
                'office_pay' => $request->input('office_pay', $fee->office_pay),
                'office_paid' => $request->input('office_paid', $fee->office_paid),
                'total_fee' => $request->input('total_fee', $fee->total_fee),
                'due_date' => $request->input('due_date', $fee->due_date),
            ]);
        }

        // Return the updated student as a resource
        return new StudentResource($student);
    }


    /**
     * Remove the specified student from storage.
     */
    //     public function destroy($id)
    //     {
    //         $student = Student::find($id); // or your specific retrieval logic

    //         if ($student) {
    //             // Check if a fee record exists for this student
    //             if ($student->fees) {
    //                 $student->fees->delete(); // Delete associated fee
    //             }

    //             // Delete the student record
    //             $student->delete();
    //             return response()->json(['message'=>'deleted successfully!!!']);
    //         }
    // }

    /**
     * Soft delete the specified student from storage.
     */
    public function destroy($id)
    {
        $student = Student::find($id); // or your specific retrieval logic

        if ($student) {
            // Soft delete the student record
            $student->delete();
            return response()->json(['message' => "Student {$id} soft deleted successfully!!!"]);
        }

        return response()->json(['message' => 'Student not found'], 404);
    }


    public function restore($id)
    {
        $student = Student::withTrashed()->findOrFail($id);
        $student->restore();
        return response()->json(['message' => "Student {$id} restored successfully"]);
    }

    /**
     * Permanently delete a student.
     */
    public function forceDelete($id)
    {
        $student = Student::withTrashed()->findOrFail($id);
        $student->forceDelete();
        return response()->json(['message' => "Student {$id} permanently deleted"]);
    }


    public function test()
    {
        return "hello test from student controller";
    }
    public function trashedStudents()
    {
        return 'hi';
        // $students = Student::onlyTrashed()->get();

        // if ($students->isEmpty()) {
        //     return response()->json([
        //         'message' => 'No soft-deleted students found',
        //         'data' => []
        //     ], 200);
        // }

        // return response()->json([
        //     'message' => 'Trashed students retrieved successfully',
        //     'data' => $students
        // ], 200);
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