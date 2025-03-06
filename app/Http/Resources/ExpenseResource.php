<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
            'expense_cash' => $this->expense_cash,
            'goods_quantity' => $this->goods_quantity,
            'description' => $this->description,
            'expense_date' => $this->expense_date,

            // Tracking cash changes
            'total_expense' => $this->total_expense,
            'total_quantity' => $this->total_quantity,
            'total_amount_of_donations' => $this->total_amount_of_donations,
            'total_amount_of_cash_before_last_expense' => $this->total_amount_of_cash_before_expense,
            'total_amount_of_cash_after_last_expense' => $this->total_amount_of_cash_after_expense,

            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
