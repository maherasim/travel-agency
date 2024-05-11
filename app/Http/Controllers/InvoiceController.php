<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Client;
use App\Models\Invoice;
 
use Illuminate\Http\Request;


class InvoiceController extends Controller
{
    public function index(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); // Fetch only id and trade_name
        return Inertia::render('invoice/invoiceform', ['clients' => $clients]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'invoice_number' => 'required',
            'description' => 'required',
            'management_fee' => 'required',
            'cgst' => 'required',
            'sgst' => 'required',
            'total' => 'required',
        ]);
    
        // Create a new invoice instance
        $invoice = Invoice::create([
            'invoice_number' => $request->invoice_number,
            'description' => $request->description,
            'management_fee' => $request->management_fee,
            'cgst' => $request->cgst,
            'sgst' => $request->sgst,
            'total' => $request->total,
        ]);
    
        return redirect()->route('services.index')->with('success', 'Ticket created successfully');
    }}
    
