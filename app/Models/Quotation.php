<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'airline_name',
        'service_type',
        'flight_number',
        'departure_time',
        'departure_date',
        'arrival_time',
        'fare_type',
        'ourcost',
        'prf',
        'room_no',
        'total_cost',
        "seat_number",
        "class",
        "gate",
        "gstn",
        "pnr_number",
        "guest_name",
        "room_category",
        "hotel_address",
        "contact_no",
        "confirmation_no"   
     ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function service()
    {
        return $this->hasOne(ServiceRequest::class,'client_id','client_id');
    }
    public function ticket()
    {
        return $this->hasOne(Ticket::class,'client_id','client_id');
    }
    public function invoice()
    {
        return $this->hasOne(Invoice::class,'client_id','client_id');
    }
}
