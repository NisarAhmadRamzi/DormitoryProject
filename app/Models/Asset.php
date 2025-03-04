<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'quantity',
        'description',
        'total_quantity',
        'total_amount_of_donations',
        'total_amount_of_cash',
    ];


    public function getTotalDonations()
    {
        return Support::sum('cash_quantity');
    }

    // // Auto-update total_amount_of_donations & total_amount_of_cash when saving
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::saving(function ($asset) {
    //         $asset->total_amount_of_donations = $asset->getTotalDonations();
    //         $asset->total_amount_of_cash = $asset->quantity + $asset->total_amount_of_donations;
    //     });
    // }
    //----------------------------------------------------------------------------------
    // public function getTotalAssetsQuantity()
    // {
    //     return self::sum('quantity');
    // }

    // // Auto-update total_amount_of_donations, total_amount_of_cash & total_quantity when saving
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::saving(function ($asset) {
    //         $asset->total_amount_of_donations = $asset->getTotalDonations();
    //         $asset->total_quantity = $asset->getTotalAssetsQuantity() + $asset->quantity;
    //         $asset->total_amount_of_cash = $asset->total_quantity + $asset->total_amount_of_donations;
    //     });
    // }
    //---------------------------------------------------------
    // Get total quantity from all assets (excluding current asset during update)
    public static function getTotalAssetsQuantity($excludingId = null)
    {
        $query = self::query();
        if ($excludingId) {
            $query->where('id', '!=', $excludingId);
        }
        return $query->sum('quantity');
    }

    // Auto-update total_amount_of_donations, total_amount_of_cash & total_quantity when saving
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($asset) {
            // Calculate sum of all cash_quantity from supports table
            $asset->total_amount_of_donations = $asset->getTotalDonations();

            // Calculate sum of all quantity from assets, excluding current record if updating
            $existingQuantity = self::getTotalAssetsQuantity($asset->id);
            $asset->total_quantity = $existingQuantity + $asset->quantity;

            // Calculate total cash
            $asset->total_amount_of_cash = $asset->total_quantity + $asset->total_amount_of_donations;
        });
    }
}
