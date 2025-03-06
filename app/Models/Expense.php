<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// class Expense extends Model
// {
//     use HasFactory;

// protected $fillable = [
//     'type',
//     'expense_cash',
//     'goods_quantity',
//     'description',
//     'expense_date',
// ];

// Auto-update total values when an expense is created
// protected static function boot()
// {
//     parent::boot();

//     static::creating(function ($expense) {
//         $expense->total_quantity = Asset::sum('quantity'); // Get total quantity
//         $expense->total_amount_of_donations = Support::sum('cash_quantity'); // Get total donations
//         $expense->total_amount_of_cash = Asset::latest()->first()->total_amount_of_cash; // Get the latest total cash
//     });

//     static::created(function ($expense) {
//         $asset = Asset::latest()->first(); // Assuming a single asset record exists

//         if (($expense->type === 'cash' || $expense->type === 'goods') && $expense->expense_cash) {
//             // Deduct cash from total_amount_of_cash in both assets and expenses table
//             $asset->decrement('total_amount_of_cash', $expense->expense_cash);
//             $expense->update(['total_amount_of_cash' => $asset->total_amount_of_cash]);
//         }
//     });
//     // When an expense is deleted, restore values
//     static::deleting(function ($expense) {
//         $asset = Asset::latest()->first();  // Assuming there's a single asset record

//         if (($expense->type === 'cash' || $expense->type === 'goods')  && $expense->expense_cash) {
//             // Restore cash back to assets table
//             $asset->increment('total_amount_of_cash', $expense->expense_cash);
//         }
//     });
// }

// // Get total donations
// public function getTotalDonations()
// {
//     return Support::sum('cash_quantity');
// }

// // Get total cash available
// public function getTotalCash()
// {
//     return Asset::sum('total_amount_of_cash');
// }

// // Get total quantity of assets
// public function getTotalQuantity()
// {
//     return Asset::sum('quantity');
// }


//-------------------------------------------------------

// protected $fillable = [
//     'type',
//     'expense_cash',
//     'goods_quantity',
//     'description',
//     'expense_date',
//     'total_quantity',
//     'total_amount_of_donations',
//     'total_amount_of_cash_before_expense',
//     'total_amount_of_cash_after_expense'
// ];

// protected static function boot()
// {
//     parent::boot();

//     // When an expense is being created
//     static::creating(function ($expense) {
//         $asset = Asset::latest()->first(); // Get latest asset record

//         $expense->total_quantity = Asset::sum('quantity'); // Total asset quantity
//         $expense->total_amount_of_donations = Support::sum('cash_quantity'); // Total donations
//         $expense->total_amount_of_cash_before_expense = $asset->total_amount_of_cash_after_expense ?? 0; // Store initial cash amount
//         $expense->total_amount_of_cash_after_expense = $expense->total_amount_of_cash_before_expense - ($expense->expense_cash ?? 0);
//     });

//     // When an expense is created, update assets table
//     static::created(function ($expense) {
//         $asset = Asset::latest()->first();
//         if ($asset) {
//             $asset->update([
//                 'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
//             ]);
//         }
//     });

//     // When an expense is updated
//     static::updating(function ($expense) {
//         $oldExpense = self::find($expense->id);
//         $asset = Asset::latest()->first();

//         if ($asset && $oldExpense) {
//             // Restore old amount before applying new deduction
//             $restoredCash = $oldExpense->expense_cash ?? 0;
//             $asset->increment('total_amount_of_cash_after_expense', $restoredCash);

//             // Now apply the new deduction
//             $expense->total_amount_of_cash_after_expense = $asset->total_amount_of_cash_after_expense - ($expense->expense_cash ?? 0);

//             // Update asset table with new value
//             $asset->update([
//                 'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
//             ]);
//         }
//     });

//     // When an expense is deleted, restore values
//     static::deleting(function ($expense) {
//         $asset = Asset::latest()->first();
//         if ($asset) {
//             $asset->increment('total_amount_of_cash_after_expense', $expense->expense_cash ?? 0);
//         }
//     });
// }
//------------------------------------------
//     protected $fillable = [
//         'type',
//         'expense_cash',
//         'goods_quantity',
//         'description',
//         'expense_date',
//         'total_quantity',
//         'total_amount_of_donations',
//         'total_amount_of_cash_before_expense',
//         'total_amount_of_cash_after_expense',
//     ];

//     protected static function boot()
//     {
//         parent::boot();

//         // When creating an expense
//         static::creating(function ($expense) {
//             $latestAsset = Asset::latest()->first();

//             // Store the total cash before any expense
//             $expense->total_amount_of_cash_before_expense = $latestAsset ? $latestAsset->total_amount_of_cash_after_expense : 0;

//             // Update total values
//             $expense->total_quantity = Asset::sum('quantity');
//             $expense->total_amount_of_donations = Support::sum('cash_quantity');

//             // Calculate new cash value after expense
//             $expense->total_amount_of_cash_after_expense = $expense->total_amount_of_cash_before_expense - ($expense->expense_cash ?? 0);
//         });

//         // After creating, update the asset table
//         static::created(function ($expense) {
//             $latestAsset = Asset::latest()->first();
//             if ($latestAsset) {
//                 $latestAsset->update([
//                     'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
//                 ]);
//             }
//         });

//         // When updating an expense
//         static::updating(function ($expense) {
//             $latestAsset = Asset::latest()->first();

//             // Keep total_amount_of_cash_before_expense unchanged
//             $expense->total_amount_of_cash_before_expense = $latestAsset->total_amount_of_cash_after_expense ?? 0;

//             // Recalculate total_amount_of_cash_after_expense
//             $expense->total_amount_of_cash_after_expense = $expense->total_amount_of_cash_before_expense - ($expense->expense_cash ?? 0);
//         });

//         // After updating, update the asset table
//         static::updated(function ($expense) {
//             $latestAsset = Asset::latest()->first();
//             if ($latestAsset) {
//                 $latestAsset->update([
//                     'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
//                 ]);
//             }
//         });

//         // When deleting an expense, restore the total cash
//         static::deleting(function ($expense) {
//             $latestAsset = Asset::latest()->first();
//             if ($latestAsset) {
//                 $latestAsset->increment('total_amount_of_cash_after_expense', $expense->expense_cash);
//             }
//         });
//     }
// }


//------------------------------------------------------------------------

class Expense extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'type',
    //     'expense_cash',
    //     'goods_quantity',
    //     'description',
    //     'expense_date',
    //     'total_expense',
    //     'total_quantity',
    //     'total_amount_of_donations',
    //     'total_amount_of_cash_before_expense',
    //     'total_amount_of_cash_after_expense',
    // ];

    // protected static function boot()
    // {
    //     parent::boot();

    //     // When creating an expense
    //     static::creating(function ($expense) {
    //         $latestAsset = Asset::latest()->first();

    //         if ($latestAsset) {
    //             // Store the total cash before expense
    //             $expense->total_amount_of_cash_before_expense = $latestAsset->total_amount_of_cash_after_expense;

    //             // Calculate new cash value after expense
    //             $expense->total_amount_of_cash_after_expense = $expense->total_amount_of_cash_before_expense - ($expense->expense_cash ?? 0);

    //             // Update the Asset table before saving expense
    //             $latestAsset->update([
    //                 'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
    //             ]);
    //         }
    //     });

    //     // When updating an expense
    //     static::updating(function ($expense) {
    //         $latestAsset = Asset::latest()->first();
    //         $oldExpense = self::find($expense->id);

    //         if ($latestAsset && $oldExpense) {
    //             // Restore the old expense cash amount first
    //             $latestAsset->increment('total_amount_of_cash_after_expense', $oldExpense->expense_cash ?? 0);

    //             // Recalculate total_amount_of_cash_after_expense
    //             $expense->total_amount_of_cash_after_expense = $latestAsset->total_amount_of_cash_after_expense - ($expense->expense_cash ?? 0);

    //             // Update Asset table after new deduction
    //             $latestAsset->update([
    //                 'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense
    //             ]);
    //         }
    //     });

    //     // When deleting an expense, restore the deducted amount
    //     static::deleting(function ($expense) {
    //         $latestAsset = Asset::latest()->first();

    //         if ($latestAsset) {
    //             // Restore the expense amount back to assets table
    //             $latestAsset->increment('total_amount_of_cash_after_expense', $expense->expense_cash ?? 0);
    //         }
    //     });
    // }

    //-----------------------------------------------------------------

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
        'total_amount_of_cash_after_expense',
    ];

    protected static function boot()
    {
        parent::boot();

        // When creating an expense
        static::creating(function ($expense) {
            $latestAsset = Asset::latest()->first();

            if ($latestAsset) {
                // Store the total cash before expense
                $expense->total_amount_of_cash_before_expense = $latestAsset->total_amount_of_cash_after_expense;

                // Deduct expense cash from total cash
                $expense->total_amount_of_cash_after_expense = $latestAsset->total_amount_of_cash_after_expense - ($expense->expense_cash ?? 0);

                // Update the asset table
                $latestAsset->update([
                    'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense,
                ]);
            }

            // Calculate total expense including new entry
            $expense->total_expense = Expense::sum('expense_cash') + ($expense->expense_cash ?? 0);

            // Fetch total quantity from assets table
            $expense->total_quantity = Asset::sum('quantity');

            // Fetch total amount of donations from supports table
            $expense->total_amount_of_donations = Support::sum('cash_quantity');
        });



        // When updating an expense
        static::updating(function ($expense) {
            $latestAsset = Asset::latest()->first();
            $oldExpense = self::find($expense->id);

            if ($latestAsset && $oldExpense) {
                // Restore the old expense amount first
                $latestAsset->increment('total_amount_of_cash_after_expense', $oldExpense->expense_cash ?? 0);

                // Deduct the updated expense cash from total cash
                $expense->total_amount_of_cash_after_expense = $latestAsset->total_amount_of_cash_after_expense - ($expense->expense_cash ?? 0);

                // Update the asset table
                $latestAsset->update([
                    'total_amount_of_cash_after_expense' => $expense->total_amount_of_cash_after_expense,
                ]);
            }

            // Calculate total expense correctly
            $expense->total_expense = Expense::sum('expense_cash') - ($oldExpense->expense_cash ?? 0) + ($expense->expense_cash ?? 0);

            // Update total quantity from assets
            $expense->total_quantity = Asset::sum('quantity');

            // Update total amount of donations from supports
            $expense->total_amount_of_donations = Support::sum('cash_quantity');
        });

        // When deleting an expense
        static::deleting(function ($expense) {
            $latestAsset = Asset::latest()->first();

            if ($latestAsset) {
                // Restore the expense amount back to assets
                $latestAsset->increment('total_amount_of_cash_after_expense', $expense->expense_cash ?? 0);
            }
        });
    }
}
