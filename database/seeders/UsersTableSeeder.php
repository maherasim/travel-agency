<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use WithoutModelEvents to prevent triggering model events while seeding
        User::withoutEvents(function () {
            // Define the number of users you want to create
            $numberOfUsers = 10;

            // Loop through and create dummy users
            for ($i = 0; $i < $numberOfUsers; $i++) {
                User::factory()->create([
                    'role_id' => rand(1, 3), // Assign a random role ID (adjust as needed)
                ]);
            }
        });
    }
}
