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
    
    public function show($id)
    {
        $vendor = Quotation::with('service')->findOrFail($id);
        $pdf = PDF::loadView('ticket1', ['vendor' => $vendor]);
        return $pdf->download('ticket.pdf');
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
    public function generateInvoice($id)
    {
        $vendor = Quotation::with('service')->findOrFail($id);
        $pdf = PDF::loadView('invoice', ['vendor' => $vendor]);
        return $pdf->download('invoice.pdf');
    }
    public function quaListfetchadmin(Request $request)
    {

        $vendorList = Quotation::with('client')->get();

        return response()->json(['data' => $vendorList], 200);
    }



    public function edit(Request $request, $id)
    {        
         $client = Quotation::find($id);
       
        return Inertia::render('Quotation/update', ['client' => $client]);
    }
 

    public function update(Request $request)
    {
       
      $date=  $request->validate([
            'airline_name' => 'nullable',
            'departure_time' => 'nullable',
            'arrival_time' => 'nullable',
            'ourcost' => 'nullable',
            'name' => 'nullable',
            'departure_date' => 'nullable',
            'flight_number' => 'nullable',
            'flight_gate' => 'nullable',
            'fare_type' => 'nullable',
            'prf' => 'nullable',
            'gate' => 'nullable',
            'class' => 'nullable',
            'total_cost' => 'nullable',
            'flight_class' => 'nullable',
            'pnr_number' => 'nullable',
            'seat_number' => 'nullable',
        ]);
        
        $id = $request->id;
        $airline_name = $request->airline_name;
        $departure_time = $request->departure_time;
        $arrival_time = $request->arrival_time;
        $ourcost = $request->ourcost;
        
        $departure_date = $request->departure_date;
        $flight_number = $request->flight_number;
        
        $fare_type = $request->fare_type;
        $prf = $request->prf;
        $gate = $request->gate;
        $class = $request->class;
        $total_cost = $request->total_cost;
       
        $pnr_number = $request->pnr_number;
        $seat_number = $request->seat_number;
    
        $quotation = Quotation::find($id);
        if (!$quotation) {
            return redirect()->back()->withErrors(['id' => 'Quotation is not found']);
        }
    
        // Update the quotation properties
        $quotation->airline_name = $airline_name;
        $quotation->departure_time = $departure_time;
        $quotation->arrival_time = $arrival_time;
        $quotation->ourcost = $ourcost;
        
        $quotation->departure_date = $departure_date;
        $quotation->flight_number = $flight_number;
       
        $quotation->fare_type = $fare_type;
        $quotation->prf = $prf;
        $quotation->gate = $gate;
        $quotation->class = $class;
        $quotation->total_cost = $total_cost;
      
        $quotation->pnr_number = $pnr_number;
        $quotation->seat_number = $seat_number;
        $quotation->save();
    
        // Pass the updated quotation data to the Inertia.js view
        return redirect()->route('quotation.fetch.admin')->with('success', 'Quotation updated successfully');
    }
    












    public function destroy(Request $request)
    {
        $request->validate([
            'quotation_id' => 'required',
        ]);
 
        $user_id = $request->quotation_id;
 
        $user = Quotation::where('id',$user_id);
        $user->delete();
 
         return redirect()->route('quotation.fetch.admin')->with('success', 'quotation Request Deleted Successfully');
    }
    public function destroy1(Request $request)
    {
        $request->validate([
            'service_id' => 'required',
        ]);
 
        $user_id = $request->service_id;
 
        $user = ServiceRequest::where('id',$user_id);
        $user->delete();
 
         return redirect()->route('fetch.admin')->with('success', 'Service Request Deleted Successfully');
    }
 
 

}
