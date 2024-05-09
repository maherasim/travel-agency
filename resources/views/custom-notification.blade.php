<!DOCTYPE html>
<html>
<head>
    <title>Alert Notification</title>
</head>
<body style="background-color: #edf2f7; padding: 32px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #a7c5eb; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 24px; border-radius: 8px;">
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">Alert Notification</h1>
        <p style="margin-bottom: 8px;">Hello,</p>
        <p style="margin-bottom: 24px;">This is an Alert notification email.</p>

        <p style="margin-bottom: 8px;">Alert Details:</p>
        <ul style="margin-bottom: 24px;">
            <li><strong style="font-weight: 600;">Alert ID:</strong> {{ $alert->id }}</li>
            <li><strong style="font-weight: 600;">Customer Name:</strong> {{ $alert->customer_name }}</li>
            <!-- Add more details as needed -->
        </ul>

        <p>Thank you for using our application!</p>
    </div>
</body>
</html>
