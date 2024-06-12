<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Client;
use App\Models\ServiceRequest;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function ticketindex(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); 
        return Inertia::render('ticket/ticketformhotel', ['clients' => $clients]);
    }
    public function cabindex(): Response
    {
        $clients = Client::select('id', 'trade_name')->get(); 
        return Inertia::render('ticket/ticketformcab', ['clients' => $clients]);
    }

    public function flightindex($id): Response
    {
        // Fetch clients with id and trade_name
        $clients = Client::select('id', 'trade_name')->get();
    
        // Retrieve the latest service request by ID
        $serviceRequest = ServiceRequest::findOrFail($id);
    
        // Check if a service request is found and get the passenger name
        $passengerName = $serviceRequest ? $serviceRequest->passenger_name : '';
    
        // Render the Inertia component with the necessary data
        return Inertia::render('ticket/ticketformflight', [
            'clients' => $clients,
            'passengerName' => $passengerName // Pass the actual passenger name
        ]);
    }
    


    public function store(Request $request)
    {
        $clientId = Auth::id();
    
        if ($request->filled('clientName')) {
            $client = Client::where('trade_name', $request->input('clientName'))->first();
    
            if ($client) {
                $clientId = $client->id;
            } else {
                return redirect()->back()->with('error', 'Client not found for the selected name.');
            }
        }
    
        if ($request->filled('client_id')) {
            $clientId = $request->input('client_id');
        }
    
      $data = $request->validate([
            'passenger_name' => 'nullable|string',
            'pnr_number' => 'nullable|string',
            'seat_number' => 'nullable|string',
            'flight' => 'nullable|string',
            'serviceType' => 'nullable|string',
            'flight_class' => 'nullable|string',
            'guest_name' => 'nullable|string',
            'confirmation_number' => 'nullable|string',
            'contact_no' => 'nullable|string',
            'room_no' => 'nullable|string',
            'email' => 'nullable|email',
            'voucher' => 'nullable|string',
            'flight_class' => 'nullable|string',
            'gender' => 'nullable|string',
            'drive_no' => 'nullable|string',
            'cab_number' => 'nullable|string',
            'cab_date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i',
            'arrival_time'=> 'nullable|date_format:H:i',
            'departure_time'=> 'nullable|date_format:H:i',
            'meal_included' => 'boolean|nullable',
            'booking_id' => 'nullable|string',
            'booking_pnr' => 'nullable|string',
            'booking_date' => 'nullable|date',
        ]);
    
        $mealIncluded = $request->has('meal_included');
    
        $ticket = Ticket::create([
            'client_id' => $clientId,
            'passenger_name' => $request->input('passenger_name'),
            'pnr_number' => $request->input('pnr_number'),
            'seat_number' => $request->input('seat_number'),
            'flight' => $request->input('flight'),
            'serviceType' => $request->input('serviceType'),
            'flight_class' => $request->input('flight_class'),
            'confirmation_number' => $request->input('confirmation_number'),
            'contact_no' => $request->input('contact_no'),
            'email' => $request->input('email'),
            'voucher' => $request->input('voucher'),
            'guest_name' => $request->input('guest_name'),
            'gender' => $request->input('gender'),
            'room_no' => $request->input('room_no'),
            'meal_included' => $mealIncluded,
            'booking_id' => $request->input('booking_id'),
            'booking_pnr' => $request->input('booking_pnr'),
            'booking_date' => $request->input('booking_date'),
            'arrival_time' => $request->input('arrival_time'),
            'departure_time' => $request->input('departure_time'),
            'drive_no' => $request->input('drive_no'),
            'cab_number' => $request->input('cab_number'),
            'cab_date' => $request->input('cab_date'),
        ]);
    
        return redirect()->route('invoice.index')->with('success', 'Ticket created successfully');
    }
    
    
}
