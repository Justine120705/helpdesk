<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    use Illuminate\Validation\Rule;

public function authorize(): bool { return true; }

public function rules(): array
{
    return [
        'title'       => ['required', 'string', 'min:5', 'max:255'],
        'description' => ['required', 'string', 'min:10'],
        'priority'    => ['required', Rule::in(['Low', 'Medium', 'High', 'Urgent'])],
        'status'      => ['required', Rule::in(['Open', 'In Progress', 'Resolved', 'Closed'])],
        'category'    => ['required', Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other'])],
    ];
}
}
