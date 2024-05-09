<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customer/CustomerForm');
    }


    public function storeCustomer(Request $request)
{
    $validatedData = $request->validate([
        'full_name' => 'required|string|max:255',
        'phone_number' => 'required|string|max:11',
        'whatsapp_number' => 'required|string|max:11',
        'email' => 'required|email|max:255',
        // Add other validation rules as needed for additional form fields
    ]);

    // If the validation passes, you can access the validated data like this:
    $name = $validatedData['full_name'];
    $phone_number = $validatedData['phone_number'];
    $whatsapp_number = $validatedData['whatsapp_number'];
    $email = $validatedData['email'];

    // Create the alert record
    Customer::create([
        'full_name' => $name,
        'phone_number' => $phone_number,
        'whatsapp_number' => $whatsapp_number,
        'email' => $email,
        'created_by' => auth()->id(),
    ]);

    // // Return the Inertia response with the success message
    // return Inertia::render('Customer/CustomerForm', [
    //     'success' => 'Customer Data successfully Saved',
    // ]);

    // Optionally, you can redirect or return a response
    return redirect()->route('customer.index')->with('success', 'Customer created successfully!');
}
  
         
        
}
