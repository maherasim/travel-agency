<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\ServiceRequest;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Client;
use PDF;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function index(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); // Fetch only id and trade_name
        return Inertia::render('Quotation/qutationform', ['clients' => $clients]);
    }
    public function storeyeh(Request $request)
    {


        $data = $request->data;
        $clientId = null;
        $clientName = $request->input('clientName');

        try {
            $clientId = Client::where('trade_name', $clientName)->value('id');

            if (!$clientId) {
                $clientId = intval($clientName);
                $client = ServiceRequest::find($clientId);

                if ($client) {
                    $clientId = $client->client_id;
                }
            }
        } catch (\Throwable $th) {
            $clientId = null;
        }

        foreach ($data as $item) {
            try {
                if ($request->has('serviceType')) {
                    Quotation::create([
                        'client_id' => $clientId,
                        'airline_name' => $item['airline_name'],
                        'departure_time' => $item['departure_time'],
                        'departure_date' => $item['departure_date'],
                        'arrival_time' => $item['arrival_time'],
                        'ourcost' => $item['ourcost'],
                        'flight_number' => $item['flight_number'],
                        'fare_type' => $item['fare_type'],
                        'prf' => $item['prf'],
                        'total_cost' => $item['total_cost'],
                        'service_type' => $request->serviceType
                    ]);
                } else {
                    Quotation::create([
                        'client_id' => $clientId,
                        'airline_name' => $item['airline_name'],
                        'departure_time' => $item['departure_time'],
                        'departure_date' => $item['departure_date'],
                        'arrival_time' => $item['arrival_time'],
                        'ourcost' => $item['ourcost'],
                        'flight_number' => $item['flight_number'],
                        'fare_type' => $item['fare_type'],
                        'prf' => $item['prf'],
                        'total_cost' => $item['total_cost']
                    ]);
                }
            } catch (\Throwable $th) {
                return response()->json($th);
            }
        }
        return response()->json(['success' => true]);
    }
    public function store(Request $request)
    {


        // Validate the incoming request data
        $validatedData = $request->validate([
            'airline_name' => 'required|string',
            'departure_time' => 'required|string',
            'arrival_time' => 'required|string',
            'ourcost' => 'required|numeric',
            'trade_name' => 'required|string',
            'flight_number' => 'required|string',
            'fare_type' => 'required|string',
            'prf' => 'required|numeric',
            'total_cost' => 'required|numeric',
        ]);

        // Initialize client ID variable
        $clientId = Auth::id();

        if ($request->filled('trade_name')) {
            $client = Client::where('trade_name', $validatedData['trade_name'])->first();

            // Check if the client exists
            if ($client) {
                $clientId = $client->id;
            } else {
                // Handle case where client is not found
                return redirect()->back()->with('error', 'Client not found for the selected   name.');
            }
        }


        // Create a new service request instance with the validated data
        $serviceRequest = Quotation::create([
            'client_id' => $clientId,
            'airline_name' => $validatedData['airline_name'],
            'departure_time' => $validatedData['departure_time'],
            'arrival_time' => $validatedData['arrival_time'],
            'ourcost' => $validatedData['ourcost'],
            'flight_number' => $validatedData['flight_number'],
            'fare_type' => $validatedData['fare_type'],
            'prf' => $validatedData['prf'],
            'total_cost' => $validatedData['total_cost'],
        ]);

        // Return a success response or redirect to the index page
        return redirect()->route('quotation.index')->with('success', 'Service request created successfully.');
    }

    public function fetchListIndexadmin(Request $request)
    {
        // Vendor record
        return Inertia::render('Quotation/viewquation');
    }

    public function view($id)
    {
        $vendor = Quotation::findOrFail($id);

        return Inertia::render('Quotation/fetchqutation', ['vendor' => $vendor]);
    }
    public function generatePdf($id)
    {
        $vendor = Quotation::with('service')->findOrFail($id);
        $pdf = PDF::loadView('p-ticket', ['vendor' => $vendor]);
        return $pdf->download('ticket.pdf');
    }
    public function quaListfetchadmin(Request $request)
    {

        $vendorList = Quotation::with('client')->get();

        return response()->json(['data' => $vendorList], 200);
    }
}
