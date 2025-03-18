<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'office_pay',
        'office_paid',
        'warranty_pay',
        'warranty_paid',
        'total_fee',
        'registration_date',
        'paid_date',
        'due_date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    // Many-to-Many relationship with rooms

}
