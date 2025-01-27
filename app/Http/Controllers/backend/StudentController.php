<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;



class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    // Return the updated student as a resource
    return new StudentResource($student);
}


    /**
     * Remove the specified student from storage.
     */
    public function destroy(Student $student)
    {
        // Delete the student record
        $student->delete();

        // Return a success response
        return response()->json(['message' => 'Student deleted successfully.'], 200);
    }
}
