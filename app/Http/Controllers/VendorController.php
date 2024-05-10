<?php

namespace App\Http\Controllers;
use App\Models\Quotation;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use App\Models\Vendor; 
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class VendorController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Vendor/VendorForm');
    }
    public function view(): Response
    {
        return Inertia::render('Client/viewqoutation');
    }
    public function updateStatus(Request $request)
    {
     
        $requestData = $request->validate([
            'id' => 'required|integer',
            'status' => 'required|string|in:request more,confirm,pending', // Adjust the validation as needed

      
      
        ]);

        $quotation = Quotation::find($requestData['id']);
        if (!$quotation) {
            return response()->json(['error' => 'Quotation not found'], 404);
        }

        $quotation->status = $requestData['status'];
        $quotation->save();

        return response()->json(['message' => 'Status updated successfully'], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trade_name' => 'required',
            'vendor_type' => 'required',
            'address' => 'required',
            'email' => 'required|email',  
            'phone_number' => 'required|string',  
            'website' => 'nullable|url',
            'contact_person_email' => 'nullable|email',
            'contact_person_phone_number' => 'nullable',
            'birthdate' => 'nullable|date',
            'pan' => 'nullable',
            'tan' => 'nullable',
            'cin' => 'nullable',
            'gstin' => 'nullable',
        ]);
    
         $existingVendor = Vendor::where('email', $request->email)
            ->orWhere('phone_number', $request->phone_number)
            ->first();
    
        if ($existingVendor) {
             return redirect()->back()->withErrors([
                'email' => $existingVendor->email === $request->email
                    ? 'The email has already been taken.'
                    : null,
                'phone_number' => $existingVendor->phone_number === $request->phone_number
                    ? 'The phone number has already been taken.'
                    : null,
            ]);
        }
    
         $vendor = Vendor::create([
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
            'vendor_type' => $request->vendor_type,
            'password' => Hash::make($request->phone_number),
        ]);
    
       
        $user = User::create([
            'name' => $request->trade_name,
            'email' => $request->email,
            'password' => Hash::make($request->phone_number),
            'role_id' => 3,
        ]);
    
        return redirect()->route('vendor.register.store')->with('success', 'Customer created successfully!');
    }


    public function vendorList(Request $request)
    {        
 
    $vendorList = Vendor::all();
    return response()->json(['data'=>$vendorList],200);
    }
public function vendorListfetch(Request $request)
{        
    $quotations = Quotation::where('client_id', Auth::id())->get();
    $serviceRequests = ServiceRequest::where('client_id', Auth::id())->get();

    return response()->json(['quotations' => $quotations, 'serviceRequests' => $serviceRequests], 200);
 }


    public function vendorListfetchadmin(Request $request)
    {        
        $vendorList = ServiceRequest::with('client')->get();

      
    return response()->json(['data'=>$vendorList],200);
    }

    public function vendorListfetchclient(Request $request)
    {        
      
        $vendorList = ServiceRequest::where('client_id', Auth::id())->get();

       return response()->json(['data'=>$vendorList],200);

    }

 
public function edit($id)
{
    $vendor = ServiceRequest::findOrFail($id);
    // Pass the vendor data to the update page
    return Inertia::render('Client/serviceupdate', ['vendor' => $vendor]);
}

public function update(Request $request)
{
    $vendor = ServiceRequest::findOrFail($request->id);

    // Update prices and airline names
    $vendor->update([
        'price' => json_encode($request->price),
        'airline_name' => json_encode($request->airline_name),
        // Add other fields you want to update here
    ]);

    // Update other fields
    $vendor->update([
        'from_location' => $request->from_location,
        'service_type' => $request->service_type,
        'to_location' => $request->to_location,
        'passenger_number' => $request->passenger_number,
        'domestic_international' => $request->domestic_international,
        'oneway_roundway' => $request->oneway_roundway,
        'departure_date' => $request->departure_date,
     ]);

    return redirect('/services/form/fetch/admin')->with('success', 'Service data updated successfully');
}


    public function vendorListIndex(Request $request)
  {        
        // Vendor record
        return Inertia::render('Vendor/VendorList');
   }
   public function fetchListIndex(Request $request)
   {        
         // Vendor record
         return Inertia::render('Client/fetchform');
    }
    public function fetchListIndexadmin(Request $request)
    {        
          // Vendor record
          return Inertia::render('Client/fetchformadmin');
     }
 

    public function vendorUpdateIndex(Request $request, $id)
    {        
         $vendor = Vendor::find($id);
         return Inertia::render('Vendor/VendorUpdate', ['vendor' => $vendor]);
    }

    public function VendorUpdateStore(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
            'address' => 'required',
            'contact_person_email' => 'required|email',
            'contact_person_phone_number' => 'required',
            'birthdate' => 'required',
            'pan_number' => 'required',
            'tan_number' => 'required',
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
        $pan_number = $request->pan_number;
        $tan_number = $request->tan_number;
        $gstin_number = $request->gstin_number;
    
         $vendor = Vendor::find($id);
        if (!$vendor) {
            return redirect()->back()->withErrors(['email' => 'Vendor not found']);
        }

        $vendor->trade_name = $name;
        $vendor->email = $email;
        $vendor->phone_number = $phone_number;
        $vendor->address = $address;
        $vendor->contact_person_email = $contact_person_email;
        $vendor->contact_person_phone_number = $contact_person_phone_number;
        $vendor->birthdate = $birthdate;
        $vendor->pan_number = $pan_number;
        $vendor->tan_number = $tan_number;
        $vendor->gstin_number = $gstin_number;
    
         $vendor->save();
    
        
return redirect()->route('vendor.list.index')->with('success', 'Vendor updated successfully');
    }
    

   public function destroy(Request $request)
   {
       $request->validate([
           'vendor_id' => 'required',
       ]);

       $user_id = $request->vendor_id;

       $user = Vendor::where('id',$user_id);
       $user->delete();

        return redirect()->route('vendor.list.index')->with('success', 'Vendor Deleted Successfully');
   }
}
