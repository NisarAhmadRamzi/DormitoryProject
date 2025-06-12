<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeeResource;
use App\Models\Fee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class FeeController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all fees')->only(['index']);
        $this->middleware('permission:view fee')->only(['show']);
        $this->middleware('permission:create fee')->only(['store']);
        $this->middleware('permission:edit fee')->only(['update']);
        $this->middleware('permission:delete fee')->only(['destroy']);
    }

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
            'warranty_pay' => 'required|numeric|min:0', // Payment amount
            'warranty_paid' => 'required|string', // Payment status
            'registration_date' => 'required|date', // Registration date
            'paid_date' => 'nullable|date', // Nullable paid date
            'due_date' => 'required|date', // Due date
        ]);

        // Extract numeric values from office_paid and warranty_paid (assuming they contain numbers)
        $officePaidAmount = (float) filter_var($validated['office_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $warrantyPaidAmount = (float) filter_var($validated['warranty_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        // Calculate total fee
        $validated['total_fee'] = $officePaidAmount + $warrantyPaidAmount;

        // Create the fee record
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
    // public function update(Request $request, Fee $fee)
    // {
    //     $validated = $request->validate([
    //         'student_id' => 'required|exists:students,id',
    //         'office_pay' => 'required|numeric|min:0', // Payment amount
    //         'office_paid' => 'required|string', // Payment status
    //         'warranty_pay' => 'required|numeric|min:0', // Payment amount
    //         'warranty_paid' => 'required|string', // Payment status
    //         'registration_date' => 'required|date', // Registration date
    //         'paid_date' => 'nullable|date', // Nullable paid date
    //         'due_date' => 'required|date', // Due date
    //     ]);

    //     // Extract numeric values from office_paid and warranty_paid (assuming they contain numbers)
    //     $officePaidAmount = (float) filter_var($validated['office_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    //     $warrantyPaidAmount = (float) filter_var($validated['warranty_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

    //     // Calculate total fee
    //     $validated['total_fee'] = $officePaidAmount + $warrantyPaidAmount;

    //     // Update the fee record
    //     $fee->update($validated);

    //     return new FeeResource($fee);
    // }
    public function update(Request $request, Fee $fee)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'office_pay' => 'required|numeric|min:0', // Payment amount
            'office_paid' => 'required|string', // Payment status
            'warranty_pay' => 'required|numeric|min:0', // Payment amount
            'warranty_paid' => 'required|string', // Payment status
            'registration_date' => 'required|date', // Registration date
            'paid_date' => 'nullable|date', // Nullable paid date
            'due_date' => 'required|date', // Due date
        ]);

        // Extract numeric values from office_paid and warranty_paid
        $officePaidAmount = (float) filter_var($validated['office_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $warrantyPaidAmount = (float) filter_var($validated['warranty_paid'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        // Calculate total fee
        $validated['total_fee'] = $officePaidAmount + $warrantyPaidAmount;

        // Replace old values with new ones
        $fee->fill($validated)->save();

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
