<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LibraryStudentResource extends JsonResource
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
            'library_id' => $this->library_id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'address' => $this->address,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'membership_status' => $this->membership_status,
            'registration_date' => $this->registration_date,
            'registration_deadline' => $this->registration_deadline,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
