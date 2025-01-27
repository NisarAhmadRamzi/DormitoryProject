<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return [
        //     'id' => $this->id,
        //     'name' => $this->name,
        //     'email' => $this->email,
        //     'profile' => $this->profile,
        //     'role_name' => $this->roles->pluck('name')->first(),
        //     'role_id' => $this->roles->pluck('id')->first(),
        //     'created_at' => $this->created_at->diffForHumans(),
        //     'updated_at' => $this->updated_at->diffForHumans(),
        // ];
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile' => $this->profile,
            'role_name' => $this->roles->pluck('name')->first(),
            'role_id' => $this->roles->pluck('id')->first(),
            'student' => $this->student ? [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'last_name' => $this->student->last_name,
                'from' => $this->student->from,
                'id_number' => $this->student->id_number,
                'academic_info' => $this->student->academic_info,
                'phone' => $this->student->phone,
                'registration_date' => $this->student->registration_date,
                'registration_deadline' => $this->student->registration_deadline,
                'created_at' => $this->student->created_at->diffForHumans(),
                'updated_at' => $this->student->updated_at->diffForHumans(),
                'room' => $this->student->room ? [
                    'id' => $this->student->room->id,
                    'room_number' => $this->student->room->room_number,
                    'type' => $this->student->room->type,
                    'capacity' => $this->student->room->capacity,
                    'current_occupancy' => $this->student->room->current_occupancy,
                    'status' => $this->student->room->status,
                    'floor' => $this->student->room->floor,
                    'created_at' => $this->student->room->created_at->diffForHumans(),
                    'updated_at' => $this->student->room->updated_at->diffForHumans(),
                ] : null, // Include room details if the student is assigned to a room
            ] : null, // Include student details if the user is associated with a student
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
        
    }
}
