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
        'to_location',
        'price',
        'return_date',
        'departure_date',
        'airline_name',
        'trade_name'
       
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
