<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Razorpay Payment Form</title>
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <h2>Razorpay Payment Form</h2>
    <form action="{{ route('payment.success') }}" method="GET">
        <script
            src="https://checkout.razorpay.com/v1/checkout.js"
            data-key="{{ env('RAZORPAY_KEY') }}"
            data-amount="{{ $orderId }}"
            data-currency="INR"
            data-name="My Store"
            data-description="Test Transaction"
            data-image="https://your-awesome-site.com/logo.png"
            data-prefill.name="John Doe"
            data-prefill.email="johndoe@example.com"
            data-theme.color="#F37254"
        ></script>
        <input type="hidden" value="{{ $orderId }}" name="razorpay_order_id">
        <input type="hidden" value="INR" name="razorpay_currency">
        <input type="hidden" value="{{ $orderId }}" name="razorpay_amount">
        <input type="hidden" value="My Store" name="razorpay_merchant_name">
        <input type="hidden" value="Payment for Order ID: {{ $orderId }}" name="razorpay_description">
        <input type="hidden" value="{{ env('APP_URL') }}/payment/failure" name="razorpay_cancel_url">
        <button type="submit" class="btn btn-primary">Pay Now</button>
    </form>
</div>

<!-- Bootstrap JS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
