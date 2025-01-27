<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'office_pay' => $this->office_pay,
            'office_paid' => $this->office_paid,
            'total_fee' => $this->total_fee,
            'registration_date'=> $this->registration_date,
            'paid_date'=> $this->paid_date,
            'due_date' => $this->due_date,
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'last_name' => $this->student->last_name,
                'email' => $this->student->email,
                'registration_date' => $this->student->registration_date,
                'registration_deadline' => $this->student->registration_deadline,
                'room' => $this->student->room ? [
                    'id' => $this->student->room->id,
                    'room_number' => $this->student->room->room_number,
                    'capacity' => $this->student->room->capacity,
                    'current_occupancy' => $this->student->room->current_occupancy,
                    'status' => $this->student->room->status,
                    'floor' => $this->student->room->floor,
                ] : null, // Include related room if available
                'user' => $this->student->user ? [
                    'id' => $this->student->user->id,
                    'name' => $this->student->user->name,
                    'email' => $this->student->user->email,
                    'role_name' => $this->student->user->roles->pluck('name')->first(),
                    'role_id' => $this->student->user->roles->pluck('id')->first(),
                    'created_at' => $this->student->user->created_at->toDateTimeString(),
                ] : null, // Include related user if available
            ],
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
        
    }
}
