<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     // Get all complaints and return as a resource collection.
    //     return ComplaintResource::collection(Complaint::all());
    // }

    // /**
    //  * Store a newly created complaint in the database.
    //  * 
    //  * @param \Illuminate\Http\Request $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //     // Validate the incoming request data.
    //     $validatedData = $request->validate([
    //         'student_id' => 'required|exists:students,id', // Ensure the student exists.
    //         'description' => 'required|string|max:500', // Validate the complaint description.
    //         'status' => 'in:Pending,Resolved', // Optional, validate status if provided.
    //     ]);

    //     // Create a new complaint.
    //     $complaint = Complaint::create($validatedData);

    //     // Return the created complaint as a resource.
    //     return new ComplaintResource($complaint);
    // }

    // /**
    //  * Display the specified complaint.
    //  * 
    //  * @param \App\Models\Complaint $complaint
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(Complaint $complaint)
    // {
    //     // Return the specific complaint as a resource.
    //     return new ComplaintResource($complaint);
    // }

    // /**
    //  * Update the specified complaint in the database.
    //  * 
    //  * @param \Illuminate\Http\Request $request
    //  * @param \App\Models\Complaint $complaint
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, Complaint $complaint)
    // {
    //     // Validate the incoming request data.
    //     $validatedData = $request->validate([
    //         'student_id' => 'required|exists:students,id', // Ensure the student exists.
    //         'description' => 'required|string|max:500', // Validate the complaint description.
    //         'status' => 'in:Pending,Resolved', // Optional, validate status if provided.
    //     ]);

    //     // Update the complaint with validated data.
    //     $complaint->update($validatedData);

    //     // Return the updated complaint as a resource.
    //     return new ComplaintResource($complaint);
    // }

    // /**
    //  * Remove the specified complaint from the database.
    //  * 
    //  * @param \App\Models\Complaint $complaint
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(Complaint $complaint)
    // {
    //     // Delete the complaint.
    //     $complaint->delete();

    //     // Return a successful response.
    //     return response()->json(['message' => 'Complaint deleted successfully.'], 200);
    // }
    //--------------------------------------------------------------------------------


    public function index()
    {
        $complaints = Complaint::with('student')->orderBy('created_at', 'desc')->get();
        return ComplaintResource::collection($complaints);
    }

    /**
     * Store a newly created complaint in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);

        $student = Student::find(2);
        $complaint = Complaint::create([
            'student_id' => $student->id, //auth()->id(), // Get the ID of the logged-in student
            'title' => $validated['title'],
            'description' => $validated['description'],
            // 'status' => 'Pending', // Default status
        ]);


        return new ComplaintResource($complaint);
    }

    /**
     * Display the specified complaint.
     */
    public function show(Complaint $complaint)
    {
        $complaint->load('student');
        return new ComplaintResource($complaint);
    }

    /**
     * Update the specified complaint in storage.
     */
    public function update(Request $request, Complaint $complaint)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,In Progress,Resolved',
            'resolved_at' => 'nullable',
        ]);

        // Update only the status and resolved_at fields
        $complaint->update($validated);

        return new ComplaintResource($complaint);
    }

    /**
     * Remove the specified complaint from storage.
     */
    public function destroy(Complaint $complaint)
    {
        $complaint->delete();

        return response()->json(['message' => 'Complaint deleted successfully!']);
    }
}
