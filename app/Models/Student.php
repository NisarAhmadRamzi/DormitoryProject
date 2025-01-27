<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;


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
        'email',
        'password',
        'from',
        'dob',
        'id_number',
        'academic_info',
        'phone',
        'registration_date',
        'registration_deadline',
        'gender',
        // 'user_id',
        'room_id',
    ];

    // Relationship with User (One to One)
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
    public function user()
    {
        return $this->hasOne(User::class, 'email', 'email');
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

    // protected static function boot()
    // {
    //     parent::boot();

    //     // When a student is added to a room
    //     static::creating(function ($student) {
    //         $room = Room::find($student->room_id);
        
    //         if ($room) {
    //             // Check if the room is full
    //             if ($room->current_occupancy >= $room->capacity) {
    //                 throw new \Exception('The room is already full and cannot accommodate more students.');
    //             }
        
    //             // Increment current occupancy
    //             $room->increment('current_occupancy');
        
    //             // Update status if room becomes full
    //             if ($room->current_occupancy === $room->capacity) {
    //                 $room->update(['status' => 'Occupied']);
    //             }
    //         }
    //     });
        

    //     // When a student is removed from a room
    //     static::deleting(function ($student) {
    //         $room = Room::find($student->room_id);
        
    //         if ($room) {
    //             // Ensure we don't decrement below zero
    //             if ($room->current_occupancy > 0) {
    //                 $room->decrement('current_occupancy');
    //             }
        
    //             // Update status to 'Available' if the room is no longer full
    //             if ($room->current_occupancy < $room->capacity) {
    //                 $room->update(['status' => 'Available']);
    //             }
    //         }
    //     });
        
    // }
//-----------------------------------------------------------

// protected static function boot()
// {
//     parent::boot();

//     // When a student is added to a room
//     static::creating(function ($student) {
//         $room = Room::find($student->room_id);
    
//         if ($room) {
//             // Check if the room is full
//             if ($room->current_occupancy >= $room->capacity) {
//                 throw new \Exception('The room is already full and cannot accommodate more students.');
//             }
    
//             // Increment current occupancy
//             $room->increment('current_occupancy');
    
//             // Update status if room becomes full
//             if ($room->current_occupancy === $room->capacity) {
//                 $room->update(['status' => 'Occupied']);
//             }
//         }

//         // Hash password before saving in the students table
//         $student->password = bcrypt($student->password);
//     });

//     // When a student is successfully created, create a corresponding user
//     static::created(function ($student) {
//         // Ensure the user doesn't already exist
//         if (!User::where('email', $student->email)->exists()) {
//             // Create the user
//             $user = User::create([
//                 'name' => $student->name,
//                 'email' => $student->email,
//                 'password' => $student->password, // Already hashed
//             ]);

//             // Assign the 'student' role to the user
//             // $role = Role::findByName('student'); // Assuming the role 'student' exists
//             // $user->assignRole($role);

//             // Assign the 'student' role to the user using Spatie
//             if (!$user->hasRole('student')) {
//                 $user->assignRole('student');
//         }
//         }
//     });


//     // // When a student is updated
//     // static::updating(function ($student) {
//     //     // Update the associated user's information
//     //     $user = User::where('email', $student->email)->first();
//     //     if ($user) {
//     //         $user->update([
//     //             'name' => $student->name,
//     //             'email' => $student->email,
//     //             'password' => bcrypt($student->password), // Ensure the password is hashed
//     //         ]);

//     //         // Ensure the user retains the 'student' role
//     //         if (!$user->hasRole('student')) {
//     //             $user->assignRole('student');
//     //         }
//     //     }
//     // });

//     // When a student is updated
//     static::updating(function ($student) {
//         // Update the associated user's information
//         $user = User::where('email', $student->getOriginal('email'))->first();
//         if ($user) {
//             $user->update([
//                 'name' => $student->name,
//                 'email' => $student->email,
//                 'password' => bcrypt($student->password), // Ensure the password is hashed
//             ]);

//             // Ensure the user retains the 'student' role
//             if (!$user->hasRole('student')) {
//                 $user->assignRole('student');
//             }
//         }
//     });

//     static::updating(function ($student) {
//         // Fetch the associated user using the original email (before the update)
//         $user = User::where('email', $student->getOriginal('email'))->first();
    
//         if ($user) {
//             // Update the user's information with the new values from the student model
//             $user->update([
//                 'name' => $student->name,
//                 'email' => $student->email,
//                 'password' => bcrypt($student->password), // Ensure the password is hashed
//             ]);
    
//             // Ensure the user retains the 'student' role
//             if (!$user->hasRole('student')) {
//                 $user->assignRole('student');
//             }
//         }
//     });
    


//     // When a student is removed from a room
//     static::deleting(function ($student) {
//         $room = Room::find($student->room_id);
    
//         if ($room) {
//             // Ensure we don't decrement below zero
//             if ($room->current_occupancy > 0) {
//                 $room->decrement('current_occupancy');
//             }
    
//             // Update status to 'Available' if the room is no longer full
//             if ($room->current_occupancy < $room->capacity) {
//                 $room->update(['status' => 'Available']);
//             }
//         }

//         // Delete the associated user when the student is deleted
//         $user = User::where('email', $student->email)->first();
//         if ($user) {
//             // Remove the role before deleting the user
//             $user->removeRole('student');

//             // Delete the user
//             $user->delete();
//         }
//     });
// }










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

        // Hash password before saving in the students table
        $student->password = bcrypt($student->password);
    });

    // When a student is successfully created
    static::created(function ($student) {
        // Create a corresponding user
        $user = User::create([
            'name' => $student->name,
            'email' => $student->email,
            'password' => $student->password, // Already hashed
        ]);

        // Assign the 'student' role to the user using Spatie
        $user->assignRole('student');
    });

    // When a student is updated
    static::updated(function ($student) {
        // Find the associated user
        $user = User::where('email', $student->getOriginal('email'))->first();
        if ($user) {
            // Update the user's information
            $user->update([
                'name' => $student->name,
                'email' => $student->email,
                'password' => bcrypt($student->password), // Ensure the password is hashed
            ]);

            // Ensure the user retains the 'student' role
            if (!$user->hasRole('student')) {
                $user->assignRole('student');
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

        // Delete the associated user and role information
        $user = User::where('email', $student->email)->first();
        if ($user) {
            // Remove all roles before deleting the user
            $user->syncRoles([]);
            $user->delete();
        }
    });
}





    




}

