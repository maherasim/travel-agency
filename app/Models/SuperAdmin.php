<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class SuperAdmin extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];



    public function isSuperAdmin()
    {
        // Assuming you have a column named 'is_super_admin' in your 'super_admins' table
        return $this->is_super_admin == 1;
    }
}
