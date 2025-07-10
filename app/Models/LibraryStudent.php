<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class LibraryStudent extends Model
{
    use HasFactory, HasRoles, SoftDeletes;

    protected $dates = ['deleted_at']; // Optional in newer Laravel versions

    protected $fillable = [
        'library_id',
        'name',
        'last_name',
        'email',
        'password',
        'address',
        'id_number',
        'academic_info',
        'phone',
        'registration_date',
        'registration_deadline',
        'gender',
        'membership_status',
    ];


    // A library student belongs to one library
    public function library()
    {
        return $this->belongsTo(Library::class);
    }
    public function user()
    {
        return $this->hasOne(User::class, 'email', 'email');
    }

    // A library student can borrow many books
    // public function borrowedBooks()
    // {
    //     return $this->hasMany(BorrowedBook::class);
    // }



    // Ensure a user is created, updated, or deleted when a library student is created, updated, or deleted
    protected static function boot()
    {
        parent::boot();

        static::created(function ($libraryStudent) {
            DB::transaction(function () use ($libraryStudent) {
                // Only create user if not already exists
                $existingUser = User::where('email', $libraryStudent->email)->first();
                if (!$existingUser) {
                    $user = new User();
                    $user->name = $libraryStudent->name;
                    $user->email = $libraryStudent->email;

                    if (Hash::needsRehash($libraryStudent->password)) {
                        $user->password = bcrypt($libraryStudent->password);
                    } else {
                        $user->password = $libraryStudent->password;
                    }

                    $role = Role::where('name', 'library_student')->first();
                    $user->role = $role ? $role->name : null;
                    $user->save();
                    if ($role) {
                        $user->assignRole($role);
                    }
                }
            });
        });


        static::updated(function ($libraryStudent) {
            $user = User::where('email', $libraryStudent->email)->first();

            if ($user) {
                $user->name = $libraryStudent->name;
                $user->email = $libraryStudent->email;

                // ✅ Only hash if it's not already hashed
                if ($libraryStudent->isDirty('password')) {
                    if (Hash::needsRehash($libraryStudent->password)) {
                        $user->password = bcrypt($libraryStudent->password);
                    } else {
                        $user->password = $libraryStudent->password;
                    }
                }

                $user->save();
            }

            if ($user && !$user->hasRole('library_student')) {
                $user->assignRole('library_student');
            }
        });


        static::deleted(function ($libraryStudent) {
            $otherStudents = LibraryStudent::where('email', $libraryStudent->email)->count();

            if ($otherStudents === 0) {
                $user = User::where('email', $libraryStudent->email)->first();
                if ($user) {
                    $user->syncRoles([]); // Remove all roles
                    $user->delete();
                }
            }
        });
    }
}
