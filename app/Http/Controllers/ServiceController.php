<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); // Fetch only id and trade_name
        return Inertia::render('Client/ServiceForm', ['clients' => $clients]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 
    public function preview(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'service_type' => 'required',
            'passenger_number' => 'nullable|integer',
            'price' => 'nullable|integer',
            'passenger_names' => 'nullable|array',
            'domestic_international' => 'nullable|string',
            'oneway_roundway' => 'nullable|string',
            'from_location' => 'nullable|string',
            'to_location' => 'nullable|string',
            'departure_date' => 'nullable|date',
            'airline_name' => 'nullable|string',
        ]);
    
        // Pass the validated data to the preview view
        return view('services.preview', compact('validatedData'));
    }
    

    public function store(Request $request)
    {  
        // Validate the incoming request data
        $validatedData = $request->validate([
            'service_type' => 'required',
            'passenger_number' => 'nullable|integer',
            'passenger_names' => 'nullable|array',
            'domestic_international' => 'nullable|string',
            'oneway_roundway' => 'nullable|string',
            'from_location' => 'nullable|string',
            'to_location' => 'nullable|string',
            'departure_date' => 'nullable|date',
            'return_date' => 'nullable|date', // Add validation rule for return date
            'airline_name' => 'nullable|string',
            'trade_name' => 'nullable|string', // Optional trade_name field
        ]);

        session()->put('service_form',$validatedData);
    
        // Initialize client ID variable
        $clientId = Auth::id();
    
        // If trade_name is provided, find the associated client
        if ($request->filled('trade_name')) {
            $client = Client::where('trade_name', $validatedData['trade_name'])->first();
    
            // Check if the client exists
            if ($client) {
                $clientId = $client->id;
            } else {
                // Handle case where client is not found
                return redirect()->back()->with('error', 'Client not found for the selected trade name.');
            }
        }
    
        // Convert passenger names array to a comma-separated string
        $passengerNamesString = !empty($validatedData['passenger_names']) ? implode(',', $validatedData['passenger_names']) : null;
    
        // Create a new service request instance with the validated data
        $serviceRequest = ServiceRequest::create([
            'client_id' => $clientId,
            'service_type' => $validatedData['service_type'],
            'passenger_number' => $validatedData['passenger_number'],
            'passenger_name' => $passengerNamesString, // Save passenger names as a string
            'domestic_international' => $validatedData['domestic_international'],
            'oneway_roundway' => $validatedData['oneway_roundway'],
            'from_location' => $validatedData['from_location'],
            'to_location' => $validatedData['to_location'],
            'departure_date' => $validatedData['departure_date'],
            'return_date' => $validatedData['return_date'], // Store the return date
            'airline_name' => $validatedData['airline_name'],
        ]);
    
        // Return a success response or redirect to the index page
        return redirect()->route('services.index')->with('success', 'Service request created successfully.');
    }
    
     


    
    
    
    public function fetch(Request $request)
    {        
        $service = ServiceRequest::all();
          return response()->json(['data'=>$service],200);
     }


    public function back(Request $request)
    {        
        
        return response()->json(['data'=>session()->get('service_form')],200);
     }

     public function destroy(Request $request)
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