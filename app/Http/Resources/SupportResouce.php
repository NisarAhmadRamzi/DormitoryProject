<?php

namespace App\Http\Resources;

use App\Models\Support;
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
            'help_date' => optional($this->help_date)->format('Y-m-d'), // Avoid errors if null
            'total_cash_donated' => $this->total_cash_donated,
            'created_at' => optional($this->created_at)->diffForHumans(), // Avoid errors if null
        ];
    }
}
