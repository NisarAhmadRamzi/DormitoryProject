<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ExpenseController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all expenses')->only(['index']);
        $this->middleware('permission:view expense')->only(['show']);
        $this->middleware('permission:create expense')->only(['store']);
        $this->middleware('permission:edit expense')->only(['update']);
        $this->middleware('permission:delete expense')->only(['destroy']);
    }

    // Store a new expense and update asset values
    // Get all expenses
    public function index()
    {
        Expense::all()->each->save();
        return ExpenseResource::collection(Expense::all());
    }

    // Store a new expense and update asset values
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:cash,goods',
            'expense_cash' => 'nullable|numeric|min:0',
            'goods_quantity' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'expense_date' => 'required|date',
        ]);

        $expense = Expense::create($validated);

        return new ExpenseResource($expense);
    }

    // Show a specific expense
    public function show(Expense $expense)
    {
        return new ExpenseResource($expense);
    }

    // Update a specific expense
    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'type' => 'required|in:cash,goods',
            'expense_cash' => 'nullable|numeric|min:0',
            'goods_quantity' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'expense_date' => 'required|date',
        ]);

        $expense->update($validated);

        return new ExpenseResource($expense);
    }

    // Delete a specific expense
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json(['message' => 'Expense Deleted successfully!']);
    }
}
