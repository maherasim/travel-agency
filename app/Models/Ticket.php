<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
       'client_id',
         
        'pnr_number',
        'seat_number',
        'flight',
        'serviceType',
        'flight_class',
        'guest_name',
        'confirmation_number',
        'contact_no',
        'email',
        'voucher',
        'room_no',
        'meal_included',
        'booking_id',
        'booking_pnr',
        'booking_date',
        'arrival_time',
        'departure_time',
        'drive_no',
        'cab_number',
        'cab_date',
        'time',  // Missing in your $fillable array
        'passenger_name', // Missing in your $fillable array
        'gender', // Missing in your $fillable array
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function service()
    {
        return $this->hasOne(ServiceRequest::class,'client_id','client_id');
    }
}
