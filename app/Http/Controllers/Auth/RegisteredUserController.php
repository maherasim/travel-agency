<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Client; // Import the UserDetails model at the top

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'trade_name' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:clients,email', // Add unique rule for email
            'phone_number' => 'required|unique:clients,phone_number', // Add unique rule for phone number
            'website' => 'nullable|url',
            'contact_person_email' => 'nullable|email',
            'contact_person_phone_number' => 'nullable',
            'birthdate' => 'nullable|date',
            'pan' => 'nullable',
            'tan' => 'nullable',
            'cin' => 'nullable',
            'gstin' => 'nullable',
        ]);
    
        // Check if client with the same email or phone number already exists
        $existingClient = Client::where('email', $request->email)
            ->orWhere('phone_number', $request->phone_number)
            ->first();
    
        if ($existingClient) {
            // Return errors with Inertia.js
            return redirect()->back()->withErrors([
                'email' => $existingClient->email === $request->email
                    ? 'The email has already been taken.'
                    : null,
                'phone_number' => $existingClient->phone_number === $request->phone_number
                    ? 'The phone number has already been taken.'
                    : null,
            ]);
        }
    
        // Create a new Client instance
        $client = Client::create([
            'trade_name' => $request->trade_name,
            'address' => $request->address,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'website' => $request->website,
            'contact_person_email' => $request->contact_person_email,
            'contact_person_phone_number' => $request->contact_person_phone_number,
            'birthdate' => $request->birthdate,
            'pan' => $request->pan,
            'tan' => $request->tan,
            'cin' => $request->cin,
            'gstin' => $request->gstin,
            'password' => Hash::make($request->phone_number),
        ]);
    
        // Create a new User instance
        $user = User::create([
            'name' => $request->trade_name,
            'email' => $request->email,
            'password' => Hash::make($request->phone_number),
            'role_id' => 2,
        ]);
    
        return redirect()->route('register')->with('success', 'Customer created successfully!');
    }
}
