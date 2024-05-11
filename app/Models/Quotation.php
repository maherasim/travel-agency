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
        'total_cost',
        "seat_number",
        "class",
        "gate",
        "pnr_number"
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
