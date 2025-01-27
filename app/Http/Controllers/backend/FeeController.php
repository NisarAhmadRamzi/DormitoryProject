<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeeResource;
use App\Models\Fee;
use Illuminate\Http\Request;


class FeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
    {
        $fees = Fee::with('student')->get(); // Retrieve all fees with related student data
        return FeeResource::collection($fees);
    }


    /**
     * Store a newly created fee.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'office_pay' => 'required|numeric|min:0', // Payment amount
            'office_paid' => 'required|string', // Payment status
            'total_fee' => 'required|numeric|min:0', // Total fee amount
            'registration_date' => 'required|date', // Registration date
            'paid_date' => 'nullable|date', // Nullable paid date
            'due_date' => 'required|date', // Due date
        ]);

        // Create the fee
        $fee = Fee::create($validated);

        return new FeeResource($fee);
    }

    /**
     * Display the specified fee.
     */
    public function show(Fee $fee)
    {
        $fee->load('student'); // Load related student data
        return new FeeResource($fee);
    }

    /**
     * Update the specified fee.
     */
    public function update(Request $request, Fee $fee)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'office_pay' => 'required|numeric|min:0', // Payment amount
            'office_paid' => 'required|string', // Payment status
            'total_fee' => 'required|numeric|min:0', // Total fee amount
            'registration_date' => 'required|date', // Registration date
            'paid_date' => 'nullable|date', // Nullable paid date
            'due_date' => 'required|date', // Due date
        ]);

        // Update the fee record
        $fee->update($validated);

        return new FeeResource($fee);
    }

    /**
     * Remove the specified fee.
     */
    public function destroy(Fee $fee)
    {
        $fee->delete();

        return response()->json(['message' => 'Deleted successfully!']);
    }
}