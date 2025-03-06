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

    // protected $fillable = [
    //     'type',
    //     'details',
    //     'goods_quantity',
    //     'cash_quantity',
    //     'helper_fullname',
    //     'helper_number',
    //     'helper_email',
    //     'help_date',
    //     'total_cash_donated',
    // ];

    // // Boot method to handle automatic total calculation
    // protected static function boot()
    // {
    //     parent::boot();

    //     // When creating a new record
    //     static::creating(function ($support) {
    //         // Calculate total cash including the new record
    //         $support->total_cash_donated = Support::sum('cash_quantity') + $support->cash_quantity;
    //     });

    //     // After a new record is created
    //     static::created(function () {
    //         Support::updateTotalCashDonated();
    //     });

    //     // When updating an existing record
    //     static::updating(function ($support) {
    //         // No need to set total_cash_donated explicitly
    //     });

    //     // After updating an existing record
    //     static::updated(function () {
    //         Support::updateTotalCashDonated();
    //     });

    //     // When deleting a record
    //     static::deleted(function () {
    //         Support::updateTotalCashDonated();
    //     });
    // }

    // // Static method to update total cash donated for all records
    // public static function updateTotalCashDonated()
    // {
    //     $totalCash = Support::sum('cash_quantity');
    //     Support::query()->update(['total_cash_donated' => $totalCash]);
    // }

    //---------------------------------

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

    // Boot method to handle automatic cumulative sum calculation
    // protected static function boot()
    // {
    //     parent::boot();

    //     // When creating a new record
    //     static::creating(function ($support) {
    //         // Get the last recorded total_cash_donated (cumulative sum)
    //         $lastTotal = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;

    //         // Set total_cash_donated for the new record
    //         $support->total_cash_donated = $lastTotal + $support->cash_quantity;
    //     });

    //     // When a record is updated
    //     static::updated(function ($support) {
    //         Support::recalculateTotalsFrom($support->id);
    //     });

    //     // When a record is deleted
    //     static::deleted(function ($support) {
    //         Support::recalculateTotalsFrom($support->id);
    //     });
    // }

    // /**
    //  * Recalculates total_cash_donated for all records starting from a given ID.
    //  */
    // public static function recalculateTotalsFrom($startId)
    // {
    //     $previousTotal = Support::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_cash_donated') ?? 0;

    //     // Get all records starting from the affected ID in order
    //     $supports = Support::where('id', '>=', $startId)->orderBy('id', 'asc')->get();

    //     foreach ($supports as $support) {
    //         $previousTotal += $support->cash_quantity; // Add current record's cash_quantity
    //         $support->total_cash_donated = $previousTotal;
    //         $support->saveQuietly(); // Avoid triggering model events again
    //     }
    // }


    // protected static function boot()
    // {
    //     parent::boot();

    //     // When creating a new record
    //     static::creating(function ($support) {
    //         $lastTotal = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
    //         $support->total_cash_donated = $lastTotal + $support->cash_quantity;
    //     });

    //     // When updating a record
    //     static::updating(function ($support) {
    //         // Fetch the original cash_quantity before update
    //         $originalCashQuantity = $support->getOriginal('cash_quantity');

    //         // If cash_quantity changes, adjust totals
    //         if ($support->cash_quantity !== $originalCashQuantity) {
    //             Support::recalculateTotalsFrom($support->id);
    //         }
    //     });

    //     // After updating a record
    //     static::updated(function ($support) {
    //         // Support::recalculateTotalsFrom($support->id);
    //         $originalCashQuantity = $support->getOriginal('cash_quantity');

    //         // If cash_quantity changes, adjust totals
    //         if ($support->cash_quantity !== $originalCashQuantity) {
    //             Support::recalculateTotalsFrom($support->id);
    //         }
    //     });

    //     // When deleting a record
    //     static::deleting(function ($support) {
    //         Support::recalculateTotalsFrom($support->id);
    //     });

    //     // After deleting a record
    //     static::deleted(function ($support) {
    //         Support::recalculateTotalsFrom($support->id);
    //     });
    // }


    protected static function boot()
    {
        parent::boot();

        // When creating a new record
        static::creating(function ($support) {
            $lastTotal = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
            $support->total_cash_donated = $lastTotal + $support->cash_quantity;
            // Refresh the related Asset model
            if ($support->asset) {
                $support->asset->refresh();
            }
        });
        // After updating a record
        static::updated(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            // Refresh the model to get the latest data before returning it
            $support->refresh();
            if ($support->asset) {
                $support->asset->refresh();
            }
        });

        // When deleting a record
        static::deleting(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            if ($support->asset) {
                $support->asset->refresh();
            }
        });

        // After deleting a record
        static::deleted(function ($support) {
            Support::recalculateTotalsFrom($support->id);
            if ($support->asset) {
                $support->asset->refresh();
            }
        });
        static::created(function ($support) {
            Asset::recalculateTotalsFrom($support->id);
            Artisan::call('cache:clear');
        });

        static::updated(function ($support) {
            Asset::recalculateTotalsFrom($support->id);
            Artisan::call('cache:clear');
        });

        static::deleted(function ($support) {
            Asset::recalculateTotalsFrom($support->id);
            Artisan::call('cache:clear');
        });
    }

    /**
     * Recalculates total_cash_donated for all records starting from a given ID.
     */
    public static function recalculateTotalsFrom($startId)
    {
        // Get the previous total before the affected record
        $previousTotal = Support::where('id', '<', $startId)->orderBy('id', 'desc')->value('total_cash_donated') ?? 0;

        // Get all records from the affected ID onwards
        $supports = Support::where('id', '>=', $startId)->orderBy('id', 'asc')->get();

        foreach ($supports as $support) {
            $previousTotal += $support->cash_quantity; // Add current record's cash_quantity
            $support->total_cash_donated = $previousTotal;
            $support->saveQuietly(); // Avoid triggering events again
        }
    }
}
    // error with its updating------------------------------------------
