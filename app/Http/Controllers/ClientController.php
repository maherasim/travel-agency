<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client; 
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Client/ClientForm');
    }

    public function store(Request $request)
    {
      
       
        $request->validate([
            'trade_name' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:clients,email', // Add unique rule for email
            'phone_number' => 'required|unique:clients,phone_number', // Add unique rule for phone number
            'website' => 'nullable|url',
            'password' => 'required|string', // Validate password field
            'contact_person_email' => 'nullable|email',
            'contact_person_phone_number' => 'nullable',
            'birthdate' => 'nullable|date',
            'pan_number' => 'required',
           
            'tan' => 'nullable',
            'cin' => 'nullable',
            'gstin' => 'nullable',
        ]);
    
        // Hash the password
        $hashedPassword = Hash::make($request->password);
    
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
            'pan_number' => $request->pan,
            'tan' => $request->tan,
            'cin' => $request->cin,
            'gstin' => $request->gstin,
            'password' => $hashedPassword, // Store hashed password
        ]);
    
        // Create a new User instance
        $user = User::create([
            'name' => $request->trade_name,
            'email' => $request->email,
            'password' => $hashedPassword, // Store hashed password
            'role_id' => 2,
        ]);
    
        return redirect()->route('client.register.store')->with('success', 'Customer created successfully!');
    }
    public function totalClients()
    {
        $totalClients = Client::count();
        return response()->json(['totalClients' => $totalClients], 200);
    }
     

    public function clientList(Request $request)
    {        
        // client record
    $ClientList = Client::all();
    return response()->json(['data'=>$ClientList],200);
    }

    public function clientListIndex(Request $request)
  {        
        // client record
        return Inertia::render('Client/ClientList');
   }

 

    public function clientUpdateIndex(Request $request, $id)
    {        
        // Fetch the client record based on the provided $id
        $client = Client::find($id);
        // Pass the client record to your Inertia.js view
        return Inertia::render('Client/ClientUpdate', ['client' => $client]);
    }

    public function clientUpdateStore(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
            'address' => 'required',
            'contact_person_email' => 'required',
            'contact_person_phone_number' => 'required',
            'birthdate' => 'required',
            'tan_number' => 'required',
            'website' => 'required',
            'password' => 'required',
            'gstin_number' => 'required',
            
        ]);
    
        $id = $request->id;
        $name = $request->name;
        $email = $request->email;
        $phone_number = $request->phone_number; 
        $address = $request->address; 
        $contact_person_email = $request->contact_person_email; 
        $contact_person_phone_number = $request->contact_person_phone_number; 
        $birthdate = $request->birthdate; 
        $tan_number = $request->tan_number; 
        $website = $request->website; 
        $password = Hash::make($request->password); // Hash the password
        $gstin_number = $request->gstin_number; 
    
        $user = Client::find($id);
        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Client is not found']);
        }
    
        // Update the client properties
        $user->trade_name = $name;
        $user->email = $email;
        $user->address = $address;
        $user->contact_person_email = $contact_person_email;
        $user->contact_person_phone_number = $contact_person_phone_number;
        $user->birthdate = $birthdate;
        $user->tan_number = $tan_number;
        $user->gstin_number = $gstin_number;
        $user->website = $website;
        $user->password = $password; // Assign hashed password
        $user->phone_number = $phone_number; // Assign phone_number to the correct property
        $user->save();
    
        // Now update the password in the users table
        $userInUsersTable = User::where('email', $email)->first();
        if ($userInUsersTable) {
            $userInUsersTable->password = $password;
            $userInUsersTable->save();
        }
    
        // Pass the updated client data to the Inertia.js view
        return redirect()->route('client.list.index')->with('success', 'Client updated successfully');
    }
    

   public function destroy(Request $request)
   {
       $request->validate([
           'client_id' => 'required',
       ]);

       $user_id = $request->client_id;

       $user = Client::where('id',$user_id);
       $user->delete();

        return redirect()->route('client.list.index')->with('success', 'Client Deleted Successfully');
   }
}
