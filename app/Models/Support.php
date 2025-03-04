<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Support extends Model
{
    use HasFactory;
    protected $table = 'supports';

    protected $fillable = [
        'type',
        'details',
        'goods_quantity',
        'cash_quantity',
        'helper_fullname',
        'helper_number',
        'helper_email',
        'help_date',
    ];

    protected $casts = [
        'help_date' => 'date',
    ];
}
