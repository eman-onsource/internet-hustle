<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateInvoiceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subscription_id' => ['required', 'exists:subscriptions,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date +27 days'],
        ];
    }
}
