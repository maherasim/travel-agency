<?php

namespace App\Models;

use App\Models\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'service_type',
        'passenger_number',
        'passenger_name',
        'domestic_international',
        'oneway_roundway',
        'from_location',    
        'room_occupancy',
        'to_location',
        'price',
        'city',
        'hotel_name',
        'check_in',
        'check_out',
        'night',
        'meal_plan',
        'hotel_category',
        'price_module',
        'return_date',
        'departure_date',
        'airline_name',
        'trade_name',
        
        'cab_type',
        'cab_price',
        'time_slot',
        'cab',
        'total_passengers',
        'time_hour',
        'cab_city',
        'start_date',
        'start_time',
        'end_date',
        'end_time'
       
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
