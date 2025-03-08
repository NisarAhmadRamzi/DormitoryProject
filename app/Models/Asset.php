<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

// class Asset extends Model
// {
//     use HasFactory;

//     protected $table = 'assets';

//     protected $fillable = [
//         'quantity',
//         'description',
//         'total_quantity',
//         'total_amount_of_donations',
//         'total_amount_of_cash_before_expense',
//         'total_amount_of_cash_after_expense',
//     ];


//     public function getTotalDonations()
//     {
//         return Support::sum('cash_quantity');
//     }

//     // // Auto-update total_amount_of_donations & total_amount_of_cash when saving
//     // protected static function boot()
//     // {
//     //     parent::boot();

//     //     static::saving(function ($asset) {
//     //         $asset->total_amount_of_donations = $asset->getTotalDonations();
//     //         $asset->total_amount_of_cash = $asset->quantity + $asset->total_amount_of_donations;
//     //     });
//     // }
//     //----------------------------------------------------------------------------------
//     // public function getTotalAssetsQuantity()
//     // {
//     //     return self::sum('quantity');
//     // }

//     // // Auto-update total_amount_of_donations, total_amount_of_cash & total_quantity when saving
//     // protected static function boot()
//     // {
//     //     parent::boot();

//     //     static::saving(function ($asset) {
//     //         $asset->total_amount_of_donations = $asset->getTotalDonations();
//     //         $asset->total_quantity = $asset->getTotalAssetsQuantity() + $asset->quantity;
//     //         $asset->total_amount_of_cash = $asset->total_quantity + $asset->total_amount_of_donations;
//     //     });
//     // }
//     //---------------------------------------------------------
//     // Get total quantity from all assets (excluding current asset during update)
//     public static function getTotalAssetsQuantity($excludingId = null)
//     {
//         $query = self::query();
//         if ($excludingId) {
//             $query->where('id', '!=', $excludingId);
//         }
//         return $query->sum('quantity');
//     }

//     // Auto-update total_amount_of_donations, total_amount_of_cash & total_quantity when saving
//     protected static function boot()
//     {
//         parent::boot();

//         static::saving(function ($asset) {
//             // Calculate sum of all cash_quantity from supports table
//             $asset->total_amount_of_donations = $asset->getTotalDonations();

//             // Calculate sum of all quantity from assets, excluding current record if updating
//             $existingQuantity = self::getTotalAssetsQuantity($asset->id);
//             $asset->total_quantity = $existingQuantity + $asset->quantity;

//             // Calculate total cash_amount_before_expense
//             $asset->total_amount_of_cash_before_expense = $asset->total_quantity + $asset->total_amount_of_donations;
//             $asset->total_amount_of_cash_after_expense = $asset->total_quantity + $asset->total_amount_of_donations;
//         });
//     }
// }

//-----------------------------------------------------------

class Asset extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'quantity',
        'description',
        'total_quantity',
        'total_amount_of_donations',
        'total_amount_of_cash_before_expense',
        'total_amount_of_cash_after_expense',
    ];

    public function supports()
    {
        return $this->hasMany(Support::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($asset) {
            Artisan::call('cache:clear');
            $previousTotalQuantity = Asset::orderBy('id', 'desc')->value('total_quantity') ?? 0;
            $asset->total_quantity = $previousTotalQuantity + $asset->quantity;

            // Ensure we always get the latest total_cash_donated from Support
            $asset->total_amount_of_donations = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
            $asset->total_amount_of_cash_before_expense = $asset->total_quantity + $asset->total_amount_of_donations;

            if (!$asset->total_amount_of_cash_after_expense) {
                $asset->total_amount_of_cash_after_expense = $asset->total_amount_of_cash_before_expense;
            }
            Artisan::call('cache:clear');
        });
        static::created(function ($asset) {
            Asset::recalculateTotalsFrom($asset->id);
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalQuantity();
            Expense::updateTotalAmountOfCashBeforeExpense();
            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
            Artisan::call('cache:clear');
        });

        static::updating(function ($asset) {
            Asset::recalculateTotalsFrom($asset->id);
            Artisan::call('cache:clear');
        });

        static::updated(function ($asset) {
            Asset::recalculateTotalsFrom($asset->id);
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalQuantity();
            Expense::updateTotalAmountOfCashBeforeExpense();
            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
            Artisan::call('cache:clear');
        });

        static::deleting(function ($asset) {
            Asset::recalculateTotalsFrom($asset->id);
        });

        static::deleted(function ($asset) {
            Asset::recalculateTotalsFrom($asset->id);
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalQuantity();
            Expense::updateTotalAmountOfCashBeforeExpense();
            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
        });
    }

    /**
     * Recalculates total values for Assets
     */
    public static function recalculateTotalsFrom($startId)
    {
        $previousTotalQuantity = Asset::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_quantity') ?? 0;
        $lastTotalCashDonated = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;

        $assets = Asset::where('id', '>=', $startId)->orderBy('id', 'asc')->get();

        foreach ($assets as $asset) {
            $previousTotalQuantity += $asset->quantity;
            $asset->total_quantity = $previousTotalQuantity;
            $asset->total_amount_of_donations = $lastTotalCashDonated;
            $asset->total_amount_of_cash_before_expense = $asset->total_quantity + $asset->total_amount_of_donations;
            $asset->saveQuietly();
        }
        Expense::updateTotalAmountOfDonations();
        Expense::updateTotalQuantity();
        Expense::updateTotalAmountOfCashBeforeExpense();
        Expense::updateExpenseTotals(1);
    }

    /**
     * Updates total_amount_of_donations in all Asset records
     */
    public static function updateTotalAmountOfDonations()
    {
        $latestTotalCashDonated = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;

        Asset::query()->update([
            'total_amount_of_donations' => $latestTotalCashDonated,
            'total_amount_of_cash_before_expense' => DB::raw('total_quantity + ' . $latestTotalCashDonated),
        ]);
    }
    public static function updateTotalAmountOfCashAfterExpense()
    {
        $latestTotalAmountOfCashAfterLastExpense = Expense::orderBy('id', 'desc')->value('total_amount_of_cash_after_last_expense') ?? 0;

        Asset::query()->update([
            'total_amount_of_cash_after_expense' => $latestTotalAmountOfCashAfterLastExpense,
        ]);
    }
}
