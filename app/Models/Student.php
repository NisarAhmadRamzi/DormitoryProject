<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'name',
    //     'f_name',
    //     'last_name',
    //     'from',
    //     'dob',
    //     'id_number',
    //     'academic_info',
    //     'phone',
    //     'registration_date',
    //     'registration_deadline',
    //     'gender',
    //     'user_id',
    //     'room_id',
    // ];

    // // Relationship with User (One to One)
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // // Relationship with Room (Many to One)
    // public function room()
    // {
    //     return $this->belongsTo(Room::class);
    // }

    // // Relationship with Fees (One to Many)
    // public function fees()
    // {
    //     return $this->hasMany(Fee::class);
    // }

    // // Relationship with Complaints (One to Many)
    // public function complaints()
    // {
    //     return $this->hasMany(Complaint::class);
    // }

    

    // // Relationship with Visitors (One to Many)
    // public function visitors()
    // {
    //     return $this->hasMany(Visitor::class);
    // }----------------------------------------------------------



    protected $fillable = [
        'name',
        'f_name',
        'last_name',
        'from',
        'dob',
        'id_number',
        'academic_info',
        'phone',
        'registration_date',
        'registration_deadline',
        'gender',
        'user_id',
        'room_id',
    ];

    // Relationship with User (One to One)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Room (Many to One)
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Relationship with Fees (One to Many)
    public function fees()
    {
        return $this->hasMany(Fee::class);
    }

    // Relationship with Complaints (One to Many)
    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }

    // Automatically update room occupancy using  Laravel Eloquent Events 
    // protected static function boot()
    // {
    //     parent::boot();

    //     // Increment room occupancy when a student is created
    //     static::creating(function ($student) {
    //         if ($student->room_id) {
    //             $room = Room::find($student->room_id);
    //             if ($room && $room->current_occupancy < $room->capacity) {
    //                 $room->increment('current_occupancy');
                    
    //             } else {
    //                 throw new \Exception('Room capacity exceeded or room does not exist.');
    //             }
    //         }
    //     });

    //     // Decrement room occupancy when a student is deleted
    //     static::deleting(function ($student) {
    //         if ($student->room_id) {
    //             $room = Room::find($student->room_id);
    //             if ($room && $room->current_occupancy > 0) {
    //                 $room->decrement('current_occupancy');
    //             }
    //         }
    //     });
    // }
    //-------------------------------------------------------

    protected static function boot()
    {
        parent::boot();

        // When a student is added to a room
        static::creating(function ($student) {
            $room = Room::find($student->room_id);
        
            if ($room) {
                // Check if the room is full
                if ($room->current_occupancy >= $room->capacity) {
                    throw new \Exception('The room is already full and cannot accommodate more students.');
                }
        
                // Increment current occupancy
                $room->increment('current_occupancy');
        
                // Update status if room becomes full
                if ($room->current_occupancy === $room->capacity) {
                    $room->update(['status' => 'Occupied']);
                }
            }
        });
        

        // When a student is removed from a room
        static::deleting(function ($student) {
            $room = Room::find($student->room_id);
        
            if ($room) {
                // Ensure we don't decrement below zero
                if ($room->current_occupancy > 0) {
                    $room->decrement('current_occupancy');
                }
        
                // Update status to 'Available' if the room is no longer full
                if ($room->current_occupancy < $room->capacity) {
                    $room->update(['status' => 'Available']);
                }
            }
        });
        
    }




}

