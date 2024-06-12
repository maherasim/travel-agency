<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\Vendor;
use Illuminate\Support\Facades\Auth;
 
use Illuminate\Http\Request;


class InvoiceController extends Controller
{
    public function index(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); // Fetch only id and trade_name
        $vendors = Vendor::select('id', 'trade_name')->get(); // Fetch only id and trade_name
        return Inertia::render('invoice/invoiceform', ['clients' => $clients,
        'vendors' => $vendors,
    ]);
    }
    public function store(Request $request)
    {
        
      
        $clientId = Auth::id();
    
        if ($request->filled('clientName')) {
            $client = Client::where('trade_name', $request->clientName)->first();
    
            // Check if the client exists
            if ($client) {
                $clientId = $client->id;
            } else {
                // Handle case where client is not found
                return redirect()->back()->with('error', 'Client not found for the selected name.');
            }
        } else {
            // If clientName is not provided, set clientId to null
            $clientId = null;
        }
    
        $request->validate([
            'invoice_number' => 'required|string',
            'description' => 'nullable',
            'management_fee' => 'nullable',
            'prf' => 'nullable',
            'ourcost' => 'nullable',
            'total_cost' => 'nullable',
            'serviceType' => 'nullable',
            'vendor' => 'nullable',
        ]);
    
        // Create a new invoice instance
        $invoice = Invoice::create([
            'client_id' => $clientId,
            'invoice_number' => $request->invoice_number,           
            'management_fee' => $request->management_fee,
            'prf' => $request->prf,
            'serviceType' => $request->serviceType,
            'ourcost' => $request->ourcost,
            'vendor' => $request->vendor,
            'total_cost' => $request->total_cost,
        ]);
    
        return redirect()->route('services.index')->with('success', 'Invoice created successfully');
    }
    

}
    
