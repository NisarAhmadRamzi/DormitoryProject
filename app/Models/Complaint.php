<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    protected $fillable = [
        'student_id', // Include this field for mass assignment
        'title',
        'description',
        'status',
        'resolved_at',
    ];
    

    // Relationship with Student (Many to One)
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
