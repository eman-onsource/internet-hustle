<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Support\Carbon;

class InvoiceController extends Controller
{
    public function index ()
    {
        $invoices = Invoice::with([
                'subscription.plan',
                'subscription.user'
            ])
            ->orderBy('is_paid', 'ASC')
            ->limit(20)
            ->get();

        return InvoiceResource::collection($invoices);
    }

    public function store (CreateInvoiceRequest $request)
    {
        $invoice = Invoice::create([
            'subscription_id' => $request->subscription_id,
            'start_date' => Carbon::parse($request->start_date),
            'end_date' => Carbon::parse($request->end_date)
        ]);
        
        $invoice->load(['subscription.plan', 'subscription.user']);
        return InvoiceResource::make($invoice);
    }

    public function pay (Invoice $invoice)
    {
        $invoice->update(['is_paid' => true]);

        return response()->noContent();
    }
}
