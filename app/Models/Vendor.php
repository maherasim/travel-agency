<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'trade_name',
        'address',
        'email',
        'phone_number',
        'website',
        'tan_number',
        'pan_number',
        'cin_number',
        'gstin_number',
        'contact_person_email',
        'contact_person_phone_number',
        'birthdate',
        'vendor_type',
        'password',
    ];
}
