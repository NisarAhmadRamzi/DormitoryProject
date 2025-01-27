<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
        //     'room_number' => $this->room_number,
        //     'type' => $this->type,
        //     'capacity' => $this->capacity,
        //     'current_occupancy' => $this->current_occupancy,
        //     'price' => $this->price,
        //     'status' => $this->status,
        //     'students' => $this->students->map(function ($student) {
        //         return [
        //             'id' => $student->id,
        //             'user_id' => $student->user_id,
        //             'room_id' => $student->room_id,
        //             'name' => $student->name,
        //             'last_name' => $student->last_name,
        //             'from' => $student->from,
        //             'id_number' => $student->id_number,
        //             'academic_info' => $student->academic_info,
        //             'phone' => $student->phone,
        //             'registration_date' => $student->registration_date,
        //             'registration_deadline' => $student->registration_deadline,
        //             'gender' => $student->gender,
        //             'created_at' => $student->created_at->diffForHumans(),
        //             'updated_at' => $student->updated_at->diffForHumans(),
        //         ];
        //         }),
        //     'floor' => $this->floor,
        //     'created_at' => $this->created_at->diffForHumans(),
        //     'updated_at' => $this->updated_at->diffForHumans(),
        // ];
        return [
            'id' => $this->id,
            'room_number' => $this->room_number,
            'type' => $this->type,
            'capacity' => $this->capacity,
            'current_occupancy' => $this->current_occupancy,
            'price' => $this->price,
            'status' => $this->status,
            'students' => $this->students->map(function ($student) {
                return [
                    'id' => $student->id,
                    'room_id' => $student->room_id,
                    'name' => $student->name,
                    'last_name' => $student->last_name,
                    'from' => $student->from,
                    'id_number' => $student->id_number,
                    'academic_info' => $student->academic_info,
                    'phone' => $student->phone,
                    'registration_date' => $student->registration_date,
                    'registration_deadline' => $student->registration_deadline,
                    'gender' => $student->gender,
                    'user' => [
                        'id' => $student->user->id ?? null, // Null-safe in case user relationship is missing
                        'name' => $student->user->name ?? null,
                        'email' => $student->user->email ?? null,
                    ],
                    'created_at' => $student->created_at->diffForHumans(),
                    'updated_at' => $student->updated_at->diffForHumans(),
                ];
            }),
            'floor' => $this->floor,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
        
    }
}
