<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ComplaintController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all complaints')->only(['index']);
        $this->middleware('permission:view complaint')->only(['show']);
        $this->middleware('permission:create complaint')->only(['store']);
        $this->middleware('permission:edit complaint')->only(['update']);
        $this->middleware('permission:delete complaint')->only(['destroy']);
    }

    /**
     * Display a listing of the complaints.
     */
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

        // This example hardcodes student ID for demonstration; replace with auth logic as needed
        $student = Student::find(2); // You should replace this with the actual logged-in student logic

        $complaint = Complaint::create([
            'student_id' => $student->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'Pending', // Default status on creation
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
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'status' => 'required|string|in:Pending,In Progress,Resolved',
            'resolved_at' => 'nullable|date',
        ]);

        $complaint->update($validated);

        return new ComplaintResource($complaint);
    }

    /**
     * Remove the specified complaint from storage.
     */
    public function destroy(Complaint $complaint)
    {
        $complaint->delete();

        return response()->json(['message' => 'Complaint deleted successfully!'], 200);
    }
}
