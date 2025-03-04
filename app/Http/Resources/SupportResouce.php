<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupportResouce extends JsonResource
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
            'type' => $this->type,
            'details' => $this->details,
            'goods_quantity' => $this->goods_quantity,
            'cash_quantity' => $this->cash_quantity,
            'helper_fullname' => $this->helper_fullname,
            'helper_number' => $this->helper_number,
            'helper_email' => $this->helper_email,
            'help_date' => $this->help_date->format('Y-m-d'),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
