<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'expense_cash',
        // 'goods_quantity',
        'description',
        'expense_date',
        'total_expense',
        'total_quantity',
        'total_amount_of_donations',
        'total_amount_of_cash_before_expense',
        'total_amount_of_cash_after_last_expense',
        'total_amount_of_cash_before_last_expense',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($expense) {
            $lastTotalExpense = Expense::orderBy('id', 'desc')->value('total_expense') ?? 0;
            $expense->total_expense = $lastTotalExpense + $expense->expense_cash;

            $expense->total_quantity = Asset::orderBy('id', 'desc')->value('total_quantity') ?? 0;
            $expense->total_amount_of_donations = Asset::orderBy('id', 'desc')->value('total_amount_of_donations') ?? 0;
            $expense->total_amount_of_cash_before_expense = Asset::orderBy('id', 'desc')->value('total_amount_of_cash_before_expense') ?? 0;

            $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->total_expense;
            $expense->total_amount_of_cash_before_last_expense = $lastTotalExpense;
        });

        static::created(function ($expense) {
            Expense::updateExpenseTotals($expense->id);
            Asset::updateTotalAmountOfCashAfterExpense(); // Update Asset table
        });

        static::updating(function ($expense) {
            Expense::updateExpenseTotals($expense->id);
        });

        static::updated(function ($expense) {
            Expense::updateExpenseTotals($expense->id);
            Asset::updateTotalAmountOfCashAfterExpense(); // Update Asset table
        });

        static::deleting(function ($expense) {
            Expense::updateExpenseTotals($expense->id);
        });

        static::deleted(function ($expense) {
            Expense::updateExpenseTotals($expense->id);
            Asset::updateTotalAmountOfCashAfterExpense(); // Update Asset table
        });
    }

    public static function updateExpenseTotals($startId)
    {
        $previousTotalExpense = Expense::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_expense') ?? 0;
        $previousTotalAmountOfCashAfterLastExpense = Expense::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_amount_of_cash_after_last_expense') ?? 0;

        $expenses = Expense::where('id', '>=', $startId)->orderBy('id', 'asc')->get();

        foreach ($expenses as $expense) {
            $previousTotalExpense += $expense->expense_cash;
            $expense->total_expense = $previousTotalExpense;

            $expense->total_quantity = Asset::orderBy('id', 'desc')->value('total_quantity') ?? 0;
            $expense->total_amount_of_donations = Asset::orderBy('id', 'desc')->value('total_amount_of_donations') ?? 0;
            $expense->total_amount_of_cash_before_expense = Asset::orderBy('id', 'desc')->value('total_amount_of_cash_before_expense') ?? 0;

            $expense->total_amount_of_cash_before_last_expense = $previousTotalAmountOfCashAfterLastExpense;
            $expense->total_amount_of_cash_after_last_expense = $expense->total_amount_of_cash_before_expense - $expense->total_expense;

            $previousTotalAmountOfCashAfterLastExpense = $expense->total_amount_of_cash_after_last_expense;

            $expense->saveQuietly();
        }
    }

    public static function updateTotalAmountOfDonations()
    {
        $latestTotalCashDonated = Asset::orderBy('id', 'desc')->value('total_amount_of_donations') ?? 0;
        Expense::query()->update(['total_amount_of_donations' => $latestTotalCashDonated]);
    }

    public static function updateTotalQuantity()
    {
        $latestTotalQuantity = Asset::orderBy('id', 'desc')->value('total_quantity') ?? 0;
        Expense::query()->update(['total_quantity' => $latestTotalQuantity]);
    }

    public static function updateTotalAmountOfCashBeforeExpense()
    {
        $latestTotalCashBeforeExpense = Asset::orderBy('id', 'desc')->value('total_amount_of_cash_before_expense') ?? 0;
        Expense::query()->update(['total_amount_of_cash_before_expense' => $latestTotalCashBeforeExpense]);
    }
}
