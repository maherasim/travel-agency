<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',         
        "seat_number",
        "flight_class",
        'flight',
        "gate",
        "pnr_number",
        "serviceType",
        "booking_id",
        "booking_pnr",
        "booking_date",
        "booking_status",
        "meal_included",
        "confirmation_number",
        "voucher"
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
