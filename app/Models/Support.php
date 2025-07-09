<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;

class Support extends Model
{
    use HasFactory;


    protected $table = 'supports';

    protected $casts = [
        'help_date' => 'date',
    ];
    protected $fillable = [
        'type',
        'details',
        'goods_quantity',
        'cash_quantity',
        'helper_fullname',
        'helper_number',
        'helper_email',
        'help_date',
        'total_cash_donated',
    ];


    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($support) {
            $lastTotal = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
            $support->total_cash_donated = $lastTotal + $support->cash_quantity;
        });

        static::created(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            Asset::updateTotalAmountOfDonations(); // Update Asset table
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalAmountOfCashBeforeExpense();

            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
            Artisan::call('cache:clear');
        });

        static::updating(function ($support) {
            Support::recalculateTotalsFrom($support->id);
        });

        static::updated(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            Asset::updateTotalAmountOfDonations(); // Update Asset table
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalAmountOfCashBeforeExpense();

            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
            Artisan::call('cache:clear');
        });

        static::deleting(function ($support) {
            Support::recalculateTotalsFrom($support->id);
        });

        static::deleted(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            Asset::updateTotalAmountOfDonations(); // Update Asset table
            Expense::updateTotalAmountOfDonations();
            Expense::updateTotalAmountOfCashBeforeExpense();

            Expense::updateExpenseTotals(1);
            Asset::updateTotalAmountOfCashAfterExpense();
            Artisan::call('cache:clear');
        });
    }

    /**
     * Recalculates total_cash_donated for all records starting from a given ID.
     */
    public static function recalculateTotalsFrom($startId)
    {
        $previousTotal = Support::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
        $supports = Support::where('id', '>=', $startId)->orderBy('id', 'asc')->get();

        foreach ($supports as $support) {
            $previousTotal += $support->cash_quantity;
            $support->total_cash_donated = $previousTotal;
            $support->saveQuietly();
        }

        // Immediately update total_amount_of_donations in Asset
        Asset::updateTotalAmountOfDonations();
        Expense::updateTotalAmountOfDonations();
        Expense::updateTotalAmountOfCashBeforeExpense();
        Expense::updateExpenseTotals(1);
        Asset::updateTotalAmountOfCashAfterExpense();
    }
}
    // error with its updating------------------------------------------
