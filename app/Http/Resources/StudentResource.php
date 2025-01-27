<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Permission\Contracts\Role;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        // Return the student data in a structured format
        // return [
        //     'id' => $this->id,
        //     // 'user_id' => $this->user_id,
        //     'room_id' => $this->room_id,
        //     'name' => $this->name,
        //     'email' => $this->email,
        //     'password' => $this->password,
        //     'f_name' => $this->f_name,
        //     'last_name' => $this->last_name,
        //     'from' => $this->from,
        //     'dob' => $this->dob,
        //     'id_number' => $this->id_number,
        //     'academic_info' => $this->academic_info,
        //     'phone' => $this->phone,
        //     'registration_date' => $this->registration_date,
        //     'registration_deadline' => $this->registration_deadline,
        //     'gender' => $this->gender,
        //     'created_at' => $this->created_at->diffForHumans(),
        //     'updated_at' => $this->updated_at->diffForHumans(),
        // ];
        return [
            'id' => $this->id,
            'user' => $this->user ? [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'role_name' => $this->user->roles->pluck('name')->first(),
                'role_id' => $this->user->roles->pluck('id')->first(),
                'created_at' => $this->user->created_at->diffForHumans(),
                'updated_at' => $this->user->updated_at->diffForHumans(),
            ] : null, // Include user details if user exists
            'room' => $this->room ? [
                'id' => $this->room->id,
                'room_number' => $this->room->room_number,
                'type' => $this->room->type,
                'capacity' => $this->room->capacity,
                'current_occupancy' => $this->room->current_occupancy,
                'status' => $this->room->status,
                'floor' => $this->room->floor,
                'created_at' => $this->room->created_at->diffForHumans(),
                'updated_at' => $this->room->updated_at->diffForHumans(),
            ] : null, // Include room details if room exists
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'f_name' => $this->f_name,
            'last_name' => $this->last_name,
            'from' => $this->from,
            'dob' => $this->dob,
            'id_number' => $this->id_number,
            'academic_info' => $this->academic_info,
            'phone' => $this->phone,
            'registration_date' => $this->registration_date,
            'registration_deadline' => $this->registration_deadline,
            'gender' => $this->gender,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
        
    }
}
