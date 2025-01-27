<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResourceAssign extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'profile' => $this->profile ? asset('storage/' . $this->profile) : null, // Full URL
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'role-id' => $this->roles->pluck('id'),
            'roles-name' => $this->roles->pluck('name'),
            'permissions-id' => $this->getAllPermissions()->pluck('id'),
            'permissions-name' => $this->getAllPermissions()->pluck('name'),
        ];
    }
}
