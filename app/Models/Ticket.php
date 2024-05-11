<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;


    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function service()
    {
        return $this->hasOne(ServiceRequest::class,'client_id','client_id');
    }
}
