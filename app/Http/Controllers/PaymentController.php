<?php

namespace App\Http\Controllers;
use Razorpay\Api\Api;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function showPaymentForm()
    {
        return view('payment.payment');
    }

    public function makePayment(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $order = $api->order->create([
            'amount' => $request->get('amount') * 100,
            'currency' => 'INR',
            'payment_capture' => 1,
        ]);

        $orderId = $order['id'];

        return view('payment.razorpay', compact('orderId'));
    }

    public function paymentSuccess()
    {
        return view('payment.payment-success');
    }

    public function paymentFailure()
    {
        return view('payment.payment-failure');
    }
}
