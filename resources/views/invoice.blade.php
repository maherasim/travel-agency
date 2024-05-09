<!DOCTYPE html>
<html>
<head>
  <title>Invoice</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }

    .container {
      margin: 0 auto;
      max-width: 800px;
    }

    table {
      width: 100%;
    }

    th, td {
      border: 1px solid #141212;
      padding: 8px;
    }

    th {
      text-align: left;
    }

    h1 {
      text-align: center;
    }

    p {
      margin: 0;
    }
  </style>
</head>
<body>

<div class="container">
  <table>
    
    <tr>
      <td colspan="2">
        <p>Tripxcia Trips LLP</p> <img src="https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png" alt="" style="height: 30%; width: 30%; float: right;">

        <p>27, Alpha Bazar, 100ft Road<br>
        Prahalad Nagar, Satellite, Ahmedabad-380015<br>
        Mob-63524 28105<br>
        E Mail-hello@tripxcia.com<br>
        PAN-AAVFT7170R</p>
       
      </td>
    </tr>
    

    <tr>
      <td colspan="2">
        <p>Web www.tripxcia.com<br>
        GST No 24AAVFT7170R122</p>
      </td>
    </tr>

    <tr>
      <td>Bill To:
       <p class="heading-john">Mr. &nbsp; {{@$vendor->service->passenger_name}}</p>
      <p class="heading-john">{{@$vendor->service->from_location	}}</p>
      </p>  
      <p>Gujarat</p></td>
      <td>
        <p>Invoice No - TTL/24-25/0017</p>
         <p> Dt - 02/05/2024</p>
      </td>
    </tr>  

    

    <tr>
      <td  style="text-align: center;" > <b>Description</b></td>
      <td style="text-align: center;" > <b>Amount</b></td>
    </tr>
    <tr>
      <td  >Air Tickets (Including Applicable Flight Taxes Collected on behalf of Airline <br>
         and other Ancillary Charges)
        <br> <br>
        <p>Ahmedabad to Dehradun</p>  
        <p>Dt - 29/04/2024</p>  <br>
        <p> {{@$vendor->service->from_location	}}
          to {{@$vendor->service->to_location	}}</p>  
        <p>Dt - {{date('d-m-Y',strtotime(@$vendor->service->departure_date)) }}</p>   
        <p>Pax - 1</p> <br>
        <p style="text-align: right;">Management Fees</p>
        <p style="text-align: right;">CGST 9%</p>
        <p style="text-align: right;">SGST 9%</p>
      
      
      
      </td>

        <td>
          <p style="text-align: right;">{{@$vendor->total_cost}}</p>

        
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <p style="text-align: right;"> 100.00</p>
          <p style="text-align: right;"> 100.00</p>
          <p style="text-align: right;"> 100.00</p>
        </td>
    </tr>
   
   <tr>
     
    <td> <p style="text-align: center;" > <b>Total Amount</b></p>   </td>
    <td>  <p style="text-align: right;"> <b>19000.0</b></p></td>
   </tr>
   <tr>
     
    <td colspan="2"> <p style="text-align: left;" > <b>Amount in words - INR Nineteen Thousands Nine Hundread Only
    </b></p>   </td>
    
   </tr>
   <tr>
  <td>
    
    <p># All Cheques should drawn in favour of "Tripxcia Trips LLP"</p>
    <p># Payment within Due Date otherwise 21% Per Annum interset <br> will be charged</p>
    <p># Subject to Ahmedabad Jurisdiction</p>
    <p># Errors and Omissions Excepted</p>
  </td>
  <td>
    <p> <b>For, Tripxcia Trips LLP</b></p>
    <p> <b>Authorized Signatory</b></p>
    <p> Bank Name - Kotak Mahindra</p>
    <p>A/c No - 6049380547</p>
    <p>IFSC Code - KKBK0002563</p>
    <p> Branch - Odhav Ring Road, Ahmedabad</p>
    <p> Payment by UPI ID - tripxcia@kotak</p>
  </td>

   </tr>
  </table>
</div>

</body>
</html>
