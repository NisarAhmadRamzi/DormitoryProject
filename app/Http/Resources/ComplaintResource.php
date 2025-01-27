<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return [
        //     'id' => $this->id, // Complaint ID.
        //     'student_id' => $this->student_id, // Associated student ID.
        //     'description' => $this->description, // Complaint description.
        //     'status' => $this->status, // Status of the complaint.
        //     'created_at' => $this->created_at->diffForHumans(), // When the complaint was created.
        //     'updated_at' => $this->updated_at->diffForHumans(), // When the complaint was last updated.
        // ];

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'resolved_at' => $this->resolved_at ? $this->resolved_at: null, // Handle null value
            'created_at' => $this->created_at->diffForHumans(), // Ensure this is a Carbon instance
            'updated_at' => $this->updated_at->diffForHumans(), // Ensure this is a Carbon instance
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'email' => $this->student->email,
            ],
        ];
    }
}
