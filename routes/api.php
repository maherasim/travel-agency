<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuotationController;
use App\Models\Client;
use App\Models\Quotation;
use App\Models\ServiceRequest;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/quotationStoreApi', function (Request $request) {
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
                    'guest_name' => $item['guest_name'],
                    'room_category' => $item['room_category'],                      
                    'hotel_address' => $item['hotel_address'],
                    'contact_no' => $item['contact_no'],
                    'confirmation_no' => $item['confirmation_no'],
                    'ourcost' => $item['ourcost'],
                    'room_no' => $item['room_no'],
                    'check_in' => $item['check_in'],
                    'check_out' => $item['check_out'],


                    'gstn' => $item['gstn'],
                    'flight_number' => $item['flight_number'],
                    'fare_type' => $item['fare_type'],
                    'prf' => $item['prf'],
                    'total_cost' => $item['total_cost'],
                    'gate' => $item['flight_gate'],
                    'pnr_number' => $item['pnr_number'],
                    'seat_number' => $item['seat_number'],
                    'class' => $item['flight_class'],
                    'service_type' => $request->serviceType
                ]);
            } else {
                Quotation::create([
                    'client_id' => $clientId,
                    'airline_name' => $item['airline_name'],
                    'departure_time' => $item['departure_time'],
                    'departure_date' => $item['departure_date'],
                    'arrival_time' => $item['arrival_time'],
                    'guest_name' => $item['guest_name'],
                    'gstn' => $item['gstn'],
                    'room_category' => $item['room_category'], 
                    'hotel_address' => $item['hotel_address'],
                    'contact_no' => $item['contact_no'],
                    'confirmation_no' => $item['confirmation_no'],
                    'room_no' => $item['room_no'],
                    'ourcost' => $item['ourcost'],
                    'check_in' => $item['check_in'],
                    'check_out' => $item['check_out'],


                    'flight_number' => $item['flight_number'],
                    'fare_type' => $item['fare_type'],
                    'prf' => $item['prf'],
                    'total_cost' => $item['total_cost'],
                    'gate' => $item['flight_gate'],
                    'pnr_number' => $item['pnr_number'],
                    'seat_number' => $item['seat_number'],
                    'class' => $item['flight_class']
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
    return response()->json(['success' => true]);
});




