<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\AlertsDefinition;
use App\Models\AlertCreation;
use App\Models\UserDetails;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AlertController extends Controller
{
    //
    public function alertCreateIndex()
    {
        $auth = Auth::user();


        return Inertia::render('Alert/AlertCreate');
    }

    public function alertDefineIndex()
    {
        $auth = Auth::user();
        return Inertia::render('Alert/AlertDefination');
    }


    public function storeAlertDefine(Request $request)
{
    // Collect data from the request
    $title = $request->input('alert_title');
    $service = $request->input('service');
    $description = $request->input('desc');    
    // Collect more field values as needed
    $auth = Auth::id();

    // Create the alert record
    AlertsDefinition::create([
        'user_id' => $auth,
        'title' => $title,
        'service' => $service,
        'description' => $description,        
        // Add more fields as needed
    ]);

    return response()->json('Alert Definition Data successfully Saved',201);
 
 }


 public function storeAlertCreate(Request $request)
{
    // Collect data from the request

    $validatedData = $request->validate([
        'customer_name' => 'required|string|max:255',
        'customer_phone_number' => 'required|string|max:11',
        'customer_whatsapp_number' => 'required|string|max:11',
        'customer_email' => 'required|email|max:30',
        'custom_priority' => '',
        'priority' => '',
        'schedule_at' => 'required|date',
        'remainder_time' => 'required|string',
    ]);
   
     // Collect more field values as needed
     $auth = Auth::id();
 
     // Create the alert record
     AlertCreation::create([
         'user_id' => $auth,
         'customer_name' => $validatedData['customer_name'],
         'customer_phone_number' => $validatedData['customer_phone_number'],
         'customer_whatsapp_number' => $validatedData['customer_whatsapp_number'],
         'customer_email' => $validatedData['customer_email'],
         'scheduled_at' => $validatedData['schedule_at'],
         'custom_priority'=>$validatedData['custom_priority'],
         'priority'=>$validatedData['priority'],
         'remainder_after_hours'=>$validatedData['remainder_time']
        ]); 
        return redirect()->route('alerts.create.index')->with('success', 'Customer created successfully!');
    }

    


  public function alertList(Request $request)
  {        
 
      // Collect more field values as needed
      $auth = Auth::id();

      // Create the alert record
      $alertList = AlertsDefinition::where('user_id',$auth)->get();
      return response()->json(['data'=>$alertList],200);
   }

   public function Dashboard() {
    $user = Auth::id();
    return Inertia::render('Dashboard',[
    ]);

}

    
}
