<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SuperAdmin;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create a new SuperAdmin record
        SuperAdmin::create([
            'name' => 'Hasin Hayatu',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123'), // Hash the password
        ]);
    }
}
