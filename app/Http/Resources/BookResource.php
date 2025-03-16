<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'title' => $this->title,
            'author' => $this->author,
            'publication_year' => $this->publication_year,
            'status' => $this->status,
            'books_total_count' => $this->books_total_count,
            'borrowed_books_total_count' => $this->borrowed_books_total_count,
            'books_total_count_after_borrowed' => $this->books_total_count_after_borrowed,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
