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

            // Ensure password is hashed only if it's not already hashed
            if (!Hash::needsRehash($student->password)) {
                $user->password = bcrypt($student->password);
            } else {
                $user->password = $student->password;
            }

            // Assign the 'student' role to the user using Spatie
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
