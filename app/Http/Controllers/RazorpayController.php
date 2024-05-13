<?php

namespace App\Http\Controllers;
use App\Models\Payment;
use Illuminate\Http\Request;
use Redirect,Response;
 
class RazorpayController extends Controller
{
    public function razorpayProduct()
    {
      return view('razorpay');
    }

    public function razorPaySuccess(Request $request){
        $data = [
                  'user_id' => '1',
                  'product_id' => $request->product_id,
                  'r_payment_id' => $request->payment_id,
                  'amount' => $request->amount,
               ];

        $getId = Payment::insertGetId($data);  

        $arr = array('msg' => 'Payment successfully credited', 'status' => true);

        return Response()->json($arr);    
    }

    public function RazorThankYou()
    {
      return view('thankyou');
    }
}
