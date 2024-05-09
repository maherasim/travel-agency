<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'service_type',
        'trade_name',
        'email',
        'address',
        'phone_number',
        'website',
        'contact_person_name',
        'contact_person_email',
        'contact_person_phone_number',
        'birthdate',
        'password',
        'passenger_number',
        'passenger_name',
        'domestic_international',
        'oneway_roundway',
        'from_location',
        'to_location',
        'departure_date',
        'airline_name',
    ];
    

   
}
