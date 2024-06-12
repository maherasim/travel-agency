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

       // dd($request->all());    

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
            'room_occupancy' => 'nullable|string',
            'return_date' => 'nullable|date', // Add validation rule for return date
            'airline_name' => 'nullable|string',
            'trade_name' => 'nullable|string', // Optional trade_name field
           //Hotel  
            'city' => 'nullable|string', // Add validation rule for city
            'hotel_name' => 'nullable|string', // Add validation rule for hotel_name
            'check_in' => 'nullable|date', // Add validation rule for check_in
            'check_out' => 'nullable|date', // Add validation rule for check_out
            'night' => 'nullable|integer', // Add validation rule for night
            'meal_plan' => 'nullable|string', // Add validation rule for meal_plan
            'hotel_category' => 'nullable|string', // Add validation rule for hotel_category
            'price_module' => 'nullable|string',

            'no_rooms' => 'nullable|string',
            'no_guests' => 'nullable|string',
            'no_adults' => 'nullable|string',
            'no_kidsseven' => 'nullable|string',
            'no_kidssix' => 'nullable|string',


//Cab type

            'cab_type' => 'nullable|string', 
            'time_slot' => 'nullable|string', 
            'cab_price' => 'nullable|string', 
            'cab' => 'nullable|string', 
            'total_passengers' => 'nullable|string', 
            'time_hour' => 'nullable|string', 
            'cab_city' => 'nullable|string', 
            'start_date' => 'nullable|string', 
            'start_time' => 'nullable|string', 
            'end_date' => 'nullable|string', 
            'end_time' => 'nullable|string', 



        ]);
    
        session()->put('service_form', $validatedData);
    
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
            'room_occupancy' => $validatedData['room_occupancy'],
            'departure_date' => $validatedData['departure_date'],
            'return_date' => $validatedData['return_date'], // Store the return date
            'airline_name' => $validatedData['airline_name'],
          
            'city' => $validatedData['city'], // Save the city
            'hotel_name' => $validatedData['hotel_name'], // Save the hotel_name
            'check_in' => $validatedData['check_in'], // Save the check_in
            'check_out' => $validatedData['check_out'], // Save the check_out
            'night' => $validatedData['night'], // Save the night
            'meal_plan' => $validatedData['meal_plan'], // Save the meal_plan
            'hotel_category' => $validatedData['hotel_category'], // Save the hotel_category
            'price_module' => $validatedData['price_module'], 

            'no_rooms' => $validatedData['no_rooms'], 
            'no_guests' => $validatedData['no_guests'], 
            'no_adults' => $validatedData['no_adults'], 
            'no_kidsseven' => $validatedData['no_kidsseven'], 
            'no_kidssix' => $validatedData['no_kidssix'], 

//Cab type


            'cab_type' => $validatedData['cab_type'], 
            'cab_price' => $validatedData['cab_price'], 
            'time_slot' => $validatedData['time_slot'], 
            'cab' => $validatedData['cab'], 
            'total_passengers' => $validatedData['total_passengers'], 
            'time_hour' => $validatedData['time_hour'], 
            'cab_city' => $validatedData['cab_city'], 
            'start_date' => $validatedData['start_date'], 
            'start_time' => $validatedData['start_time'], 
            'end_date' => $validatedData['end_date'], 
            'end_time' => $validatedData['end_time'], 


        ]);
    
        // Return a success response or redirect to the index page
        return redirect()->route('services.index')->with('success', 'Service request created successfully.');
    }
    
    
     


    
    
    
    public function fetch(Request $request)
    {        
        $service = ServiceRequest::all();
          return response()->json(['data'=>$service],200);
     }

     public function updateStatus(Request $request)
     {
      
         $requestData = $request->validate([
             'id' => 'required|integer',
             'status' => 'required|string|in:Declined,Confirm,Pending', // Adjust the validation as needed
 
       
       
         ]);
 
         $service = ServiceRequest::find($requestData['id']);
         if (!$service) {
             return response()->json(['error' => 'Service not found'], 404);
         }
 
         $service->status = $requestData['status'];
         $service->save();
 
         return response()->json(['message' => 'Status updated successfully'], 200);
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