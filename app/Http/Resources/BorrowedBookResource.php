<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowedBookResource extends JsonResource
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
            'borrow_date' => $this->borrow_date,
            'return_date' => $this->return_date,
            'status' => $this->status,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'book' => [
                'id' => $this->book->id,
                'title' => $this->book->title,
                'author' => $this->book->author,
                'publication_year' => $this->book->publication_year,
                'status' => $this->book->status,
            ],
            'student' => $this->student ? [
                'id' => $this->student->id,
                'name' => $this->student->name,
                'last_name' => $this->student->last_name,
                'email' => $this->student->email,
                'phone' => $this->student->phone,
                'registration_date' => $this->student->registration_date,
            ] : null,
            'library_student' => $this->libraryStudent ? [
                'id' => $this->libraryStudent->id,
                'name' => $this->libraryStudent->name,
                'email' => $this->libraryStudent->email,
                'phone' => $this->libraryStudent->phone,
                'registration_date' => $this->libraryStudent->registration_date,
            ] : null,
        ];
    }
}
