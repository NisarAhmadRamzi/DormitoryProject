<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

// class Expense extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'type',
//         'expense_cash',
//         'goods_quantity',
//         'description',
//         'expense_date',
//         'total_expense',
//         'total_quantity',
//         'total_amount_of_donations',
//         'total_amount_of_cash_before_expense',
//         'total_amount_of_cash_after_last_expense',
//         'total_amount_of_cash_before_last_expense',
//     ];

//     protected static function boot()
//     {
//         parent::boot();

//         static::creating(function ($expense) {
//             Artisan::call('cache:clear');
//             self::updateExpenseFields($expense);
//         });

//         static::updating(function ($expense) {
//             Artisan::call('cache:clear');
//             self::updateExpenseFields($expense);
//         });

//         static::deleting(function ($expense) {
//             Artisan::call('cache:clear');
//         });

//         static::deleted(function () {
//             Expense::recalculateExpenses();
//         });
//     }

//     // private static function updateExpenseFields($expense)
//     // {
//     //     $latestAsset = Asset::latest()->first();
//     //     $latestSupport = Support::latest()->first();
//     //     $lastExpense = Expense::latest()->first();

//     //     $expense->total_quantity = $latestAsset->total_quantity ?? 0;
//     //     $expense->total_amount_of_donations = $latestSupport->total_cash_donated ?? 0;
//     //     $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;

//     //     // Fix for total_expense
//     //     $totalExpenseBefore = Expense::sum('expense_cash');
//     //     $expense->total_expense = $totalExpenseBefore + $expense->expense_cash;

//     //     $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->total_expense;
//     //     $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? 0;
//     // }

//     private static function updateExpenseFields($expense)
//     {
//         $latestAsset = Asset::latest()->first();
//         $latestSupport = Support::latest()->first();

//         // Ensure $expense->id is set before using it in the query
//         $lastExpense = null;
//         if (!empty($expense->id)) {
//             $lastExpense = Expense::where('id', '<', $expense->id)->latest()->first();
//         }

//         $expense->total_quantity = $latestAsset->total_quantity ?? 0;
//         $expense->total_amount_of_donations = $latestSupport->total_cash_donated ?? 0;
//         $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;

//         // Handle total_expense calculation correctly
//         if ($expense->exists) {
//             $oldExpenseCash = Expense::where('id', $expense->id)->value('expense_cash') ?? 0;
//         } else {
//             $oldExpenseCash = 0;
//         }

//         $totalExpenseBefore = Expense::where('id', '<>', $expense->id)->sum('expense_cash');
//         $expense->total_expense = $totalExpenseBefore + $expense->expense_cash;

//         // Avoid null reference issues
//         $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->total_expense;
//         $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? 0;
//     }





//     public static function recalculateExpenses()
//     {
//         Artisan::call('cache:clear');
//         $expenses = Expense::orderBy('id', 'asc')->get();
//         $totalExpense = 0;

//         foreach ($expenses as $expense) {
//             $totalExpense += $expense->expense_cash;
//             $expense->total_expense = $totalExpense;
//             $expense->total_quantity = Asset::sum('total_quantity');
//             $expense->total_amount_of_donations = Support::latest()->value('total_cash_donated') ?? 0;
//             $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;
//             $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->total_expense;
//             $expense->saveQuietly();
//         }
//     }
// }

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'expense_cash',
        'goods_quantity',
        'description',
        'expense_date',
        'total_expense',
        'total_quantity',
        'total_amount_of_donations',
        'total_amount_of_cash_before_expense',
        'total_amount_of_cash_before_last_expense',
        'total_amount_of_cash_after_last_expense',
    ];

    /**
     * Boot method to automatically set calculated fields before saving.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($expense) {
            // Calculate total_expense as the sum of all expense_cash values
            $expense->total_expense = Expense::sum('expense_cash') + $expense->expense_cash;

            // Get the latest total_quantity from Asset model
            $expense->total_quantity = Asset::latest('id')->value('total_quantity') ?? 0;

            // Get the latest total_amount_of_donations from Support model
            $expense->total_amount_of_donations = Support::latest('id')->value('total_cash_donated') ?? 0;

            // Calculate total_amount_of_cash_before_expense
            $expense->total_amount_of_cash_before_expense =
                $expense->total_quantity + $expense->total_amount_of_donations;

            // Get the last total_amount_of_cash_after_last_expense
            $lastExpense = Expense::latest('id')->first();
            $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? $expense->total_amount_of_cash_before_expense;

            // Calculate total_amount_of_cash_after_last_expense
            $expense->total_amount_of_cash_after_last_expense =
                $expense->total_amount_of_cash_before_expense - $expense->total_expense;
        });

        // static::updating(function ($expense) {
        //     // Retrieve the original expense_cash value before updating
        //     $originalExpenseCash = $expense->getOriginal('expense_cash');

        //     // Calculate the corrected total_expense by subtracting the old value and adding the new one
        //     $expense->total_expense = Expense::sum('expense_cash') - $originalExpenseCash + $expense->expense_cash;

        //     // Fetch latest total_quantity from Asset model
        //     $expense->total_quantity = Asset::latest('id')->value('total_quantity') ?? 0;

        //     // Fetch latest total_amount_of_donations from Support model
        //     $expense->total_amount_of_donations = Support::latest('id')->value('total_cash_donated') ?? 0;

        //     // Calculate total_amount_of_cash_before_expense
        //     $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;

        //     // Get the last expense's total_amount_of_cash_after_last_expense
        //     $lastExpense = Expense::where('id', '<>', $expense->id)->latest('id')->first();
        //     $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? $expense->total_amount_of_cash_before_expense;

        //     // Correctly update total_amount_of_cash_after_last_expense
        //     $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->expense_cash;
        // });

        static::updating(function ($expense) {
            Artisan::call('cache:clear');
            // Retrieve the original expense_cash value before updating
            $originalExpenseCash = $expense->getOriginal('expense_cash');

            // Fetch latest total_quantity from Asset model
            $expense->total_quantity = Asset::latest('id')->value('total_quantity') ?? 0;

            // Fetch latest total_amount_of_donations from Support model
            $expense->total_amount_of_donations = Support::latest('id')->value('total_cash_donated') ?? 0;

            // Calculate total_amount_of_cash_before_expense
            $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;

            // Get the last expense's total_amount_of_cash_after_last_expense
            $lastExpense = Expense::where('id', '<>', $expense->id)->latest('id')->first();
            $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? $expense->total_amount_of_cash_before_expense;

            // **Fix total_expense Calculation**
            // Remove the old expense_cash value from total_expense first
            $previousTotalExpense = Expense::sum('expense_cash') - $originalExpenseCash;

            // Add the new expense_cash value
            $expense->total_expense = $previousTotalExpense + $expense->expense_cash;

            // Correctly update total_amount_of_cash_after_last_expense
            $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->expense_cash;
            Artisan::call('cache:clear');
        });

        static::updated(function ($expense) {
            Artisan::call('cache:clear');
            // Fetch latest total_quantity from Asset model
            $expense->total_quantity = Asset::latest('id')->value('total_quantity') ?? 0;

            // Fetch latest total_amount_of_donations from Support model
            $expense->total_amount_of_donations = Support::latest('id')->value('total_cash_donated') ?? 0;

            // Calculate total_amount_of_cash_before_expense
            $expense->total_amount_of_cash_before_expense = $expense->total_quantity + $expense->total_amount_of_donations;

            // Get the last expense's total_amount_of_cash_after_last_expense
            $lastExpense = Expense::where('id', '<>', $expense->id)->latest('id')->first();
            $expense->total_amount_of_cash_before_last_expense = $lastExpense->total_amount_of_cash_after_last_expense ?? $expense->total_amount_of_cash_before_expense;

            // **Fix total_expense Calculation**
            // Remove the old expense_cash value from total_expense first
            $previousTotalExpense = Expense::sum('expense_cash') - $expense->getOriginal('expense_cash');

            // Add the new expense_cash value
            $expense->total_expense = $previousTotalExpense + $expense->expense_cash;

            // Correctly update total_amount_of_cash_after_last_expense
            $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->expense_cash;
            Artisan::call('cache:clear');
        });

        static::deleting(function ($expense) {
            // Adjust total_expense when an expense is deleted
            Expense::where('id', '<>', $expense->id)->update([
                'total_expense' => Expense::where('id', '<>', $expense->id)->sum('expense_cash'),
            ]);
        });

        static::deleted(function ($expense) {
            Artisan::call('cache:clear');
            Expense::recalculateExpenses($expense);
        });
    }

    /**
     * Update total_amount_of_donations in Expense table based on the latest Support record.
     */
    public static function updateTotalAmountOfDonations()
    {
        $latestTotalCashDonated = Support::latest('id')->value('total_cash_donated') ?? 0;

        Expense::query()->update([
            'total_amount_of_donations' => $latestTotalCashDonated,
            'total_amount_of_cash_before_expense' => DB::raw('total_quantity + ' . $latestTotalCashDonated),
        ]);
    }

    /**
     * Update total_quantity in Expense table based on the latest Asset record.
     */
    public static function updateTotalQuantity()
    {
        $latestTotalQuantity = Asset::latest('id')->value('total_quantity') ?? 0;

        Expense::query()->update([
            'total_quantity' => $latestTotalQuantity,
            'total_amount_of_cash_before_expense' => DB::raw($latestTotalQuantity . ' + total_amount_of_donations'),
        ]);
    }

    /**
     * Update total_amount_of_cash_before_expense whenever total_quantity or total_amount_of_donations changes.
     */
    public static function updateTotalAmountOfCashBeforeExpense()
    {
        Expense::query()->update([
            'total_amount_of_cash_before_expense' => DB::raw('total_quantity + total_amount_of_donations'),
        ]);
    }
}
