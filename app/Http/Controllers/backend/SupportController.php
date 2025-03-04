<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupportResouce;
use App\Models\Support;
use Illuminate\Http\Request;


class SupportController extends Controller
{
    // List all supports
    public function index()
    {
        return SupportResouce::collection(Support::all());
    }

    // Store a new support record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'details' => 'required|string',
            'goods_quantity' => 'nullable|integer|min:0',
            'cash_quantity' => 'nullable|integer|min:0',
            'helper_fullname' => 'required|string',
            'helper_number' => 'required|string',
            'helper_email' => 'nullable|string|email',
            'help_date' => 'required|date',
        ]);

        $support = Support::create($validated);
        return new SupportResouce($support);
    }

    // Show a specific support record
    public function show(Support $support)
    {
        return new SupportResouce($support);
    }

    // Update a support record
    public function update(Request $request, Support $support)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'details' => 'required|string',
            'goods_quantity' => 'nullable|integer|min:0',
            'cash_quantity' => 'nullable|integer|min:0',
            'helper_fullname' => 'required|string',
            'helper_number' => 'required|string',
            'helper_email' => 'nullable|string|email',
            'help_date' => 'required|date',
        ]);

        $support->update($validated);
        return new SupportResouce($support);
    }

    // Delete a support record
    public function destroy(Support $support)
    {
        $support->delete();
        return response()->json(['message' => 'Support record deleted successfully']);
    }
}
