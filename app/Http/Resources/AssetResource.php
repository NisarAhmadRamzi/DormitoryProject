<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
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
            'quantity' => $this->quantity,
            'description' => $this->description,
            'total_quantity' => $this->total_quantity,
            'total_amount_of_donations' => $this->total_amount_of_donations,
            'total_amount_of_cash_before_expense' => $this->total_amount_of_cash_before_expense,
            'total_amount_of_cash_after_expense' => $this->total_amount_of_cash_after_expense,
            // 'total_amount_of_cash' => $this->total_amount_of_cash,
            // 'supports' => $this->supports,
        ];
    }
}
