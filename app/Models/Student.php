<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;


class Student extends Model
{
    use HasFactory, SoftDeletes;

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
        'room_id',
    ];
    protected $dates = ['deleted_at'];

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
        return $this->hasOne(Fee::class); // Cascade delete when student is deleted
    }

    // Relationship with Complaints (One to Many)
    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }
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

        // When a student is successfully created
        static::created(function ($student) {
            $user = User::create([
                'name' => $student->name,
                'email' => $student->email,
                'password' => Hash::needsRehash($student->password)
                    ? bcrypt($student->password)
                    : $student->password,
            ]);


            $role = Role::where('name', 'student')->first();
            $user->role = $role->name;
            $user->save();
            $user->assignRole($role);
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
                    'password' => Hash::needsRehash($student->password)
                        ? bcrypt($student->password)
                        : $student->password,
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
                $user->syncRoles([]);

                // Use soft delete if User model supports it
                if (in_array(SoftDeletes::class, class_uses($user))) {
                    $user->delete(); // Soft delete
                } else {
                    $user->forceDelete(); // Hard delete if SoftDeletes not available
                }
            }
        });
    }
}
