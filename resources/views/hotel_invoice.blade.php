<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            .container{
                  
                padding: 8px;
                font-size: 17px;  
                width: 50% !important;
            }
            *{
                padding: 0px;
                margin: 0px;
            }
    table{
        border: 3px solid black;
        color: black;
        
    }


    table .img-trip{
        padding-top: 10px;
        
    }
    body{
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
 #table2{
    border-top: 0px;
    padding-top: 15px;
 }
 .table3 {
    border-top: 0px;
    padding-top: 15px;
    border-collapse: collapse;
    /* border-left: 0px; */
    /* border-right: 0px; */
}

.table3 th,
.table3 td {
   
    border: 1px solid #000;
    border-top: 0px;
    padding: 8px;
}
.table4{
    border-top: 0px;
    padding-bottom: 20px;
}
.line{
    padding-top: 30px;
}
@media print {
  @page {
    size: "A4" !important;
    margin: 0 !important;
  }

  .container {
    width: 100% !important;
  }
  #printButton {
            display: none;
        }
}
 </style>
    </head>
    <body>
        <div class="container" align="center" >
            <table width="98%" align="center">
                <tr>
                    <td colspan="2"><h1>Tripxcia Trips LLP</h1></td>
                    <td rowspan="5"><img class="img-trip" src="https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png" alt="Tripxcia" width="150px" height="150px"></td>
                </tr>
                <tr>
                    <td colspan="2">27, Alpha Bazar, 100ft Road</td>
                </tr>
                <tr>
                    <td colspan="2">Prahalad Nagar, Satellite, Ahmedabad- 380015</td>
                </tr>
                <tr>
                    <td colspan="2">Mob - 63524 28105</td>
                </tr>
                <tr>  
                    <td colspan="2">E Mail - hello@tripxcia.com</td>
                </tr>
                <tr> 
                    <td colspan="2">  PAN-AAVFT7170R | GSTN-245767AR34</td>
                </tr>
            </table>
        <table id="table2" width="98%" align="center" >
            <tr><td>Bill To</td> <td>Invoice No - TTL/{{ @$vendor->invoice->invoice_number }}</td></tr>
            <tr><td>{{@$tradeName }}</td><td>Dt - {{ date('d-m-Y', strtotime(@$vendor->invoice->created_at)) }}</td></tr>
            <tr><td>{{ @$vendor->hotel_address }}</td></tr>
             
            <tr><td>GST No - {{ @$gstn }}</td></tr>
        </table>
      <!-- table3 -->
      <table class="table3" width="98%" align="center">
        <tr>
            <th>Description</th>
            <th >Amount</th>
        </tr>
        <tr>
            <td>{{@$vendor->guest_name}}, {{ @$vendor->hotel_address }} <br>Check in Dt - {{ @$vendor->check_in}}<br>Check out Dt - {{ @$vendor->check_out}}<br>{{ @$vendor->room_category}}<br>1 Night with CPAI <br> <br> <br>
               
                
                        
        <?php
        $gst_first_two_digits_vendor = substr(@$gstn, 0, 2);
        $gst_first_two_digits_tripxcia = substr('245767AR34', 0, 2);

        $total_cost = @$vendor->total_cost;
        $cgst = 0;
        $sgst = 0;
        $igst = 0;
        
        if ($gst_first_two_digits_vendor == '24' && $gst_first_two_digits_tripxcia == '24') {
            $cgst = $total_cost * 0.025;
            $sgst = $total_cost * 0.025;
            echo ' <h4 style="float: right;">CGST 2.5%</h4> <br>' ;  
            echo '<h4 style="float: right;">SGST 2.5%</h4>'; 
          
        } else {
            $igst = $total_cost * 0.05;
            echo ' <h4 style="float: right;">IGST 5%</h4>';
        }

        $total_amount = $total_cost + $cgst + $sgst + $igst;

        function convertNumberToWords($number) {
            $hyphen = '-';
            $conjunction = ' and ';
            $separator = ', ';
            $negative = 'negative ';
            $decimal = ' point ';
            $dictionary = array(
                0 => 'Zero',
                1 => 'One',
                2 => 'Two',
                3 => 'Three',
                4 => 'Four',
                5 => 'Five',
                6 => 'Six',
                7 => 'Seven',
                8 => 'Eight',
                9 => 'Nine',
                10 => 'Ten',
                11 => 'Eleven',
                12 => 'Twelve',
                13 => 'Thirteen',
                14 => 'Fourteen',
                15 => 'Fifteen',
                16 => 'Sixteen',
                17 => 'Seventeen',
                18 => 'Eighteen',
                19 => 'Nineteen',
                20 => 'Twenty',
                30 => 'Thirty',
                40 => 'Forty',
                50 => 'Fifty',
                60 => 'Sixty',
                70 => 'Seventy',
                80 => 'Eighty',
                90 => 'Ninety',
                100 => 'Hundred',
                1000 => 'Thousand',
                1000000 => 'Million',
                1000000000 => 'Billion'
            );

            if (!is_numeric($number)) {
                return false;
            }

            if (($number >= 0 && (int) $number < 0) || (int) $number < 0 - PHP_INT_MAX) {
                // overflow
                trigger_error(
                    'convertNumberToWords only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX,
                    E_USER_WARNING
                );
                return false;
            }

            if ($number < 0) {
                return $negative . convertNumberToWords(abs($number));
            }

            $string = $fraction = null;

            if (strpos($number, '.') !== false) {
                list($number, $fraction) = explode('.', $number);
            }

            switch (true) {
                case $number < 21:
                    $string = $dictionary[$number];
                    break;
                case $number < 100:
                    $tens = ((int) ($number / 10)) * 10;
                    $units = $number % 10;
                    $string = $dictionary[$tens];
                    if ($units) {
                        $string .= $hyphen . $dictionary[$units];
                    }
                    break;
                case $number < 1000:
                    $hundreds = $number / 100;
                    $remainder = $number % 100;
                    $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                    if ($remainder) {
                        $string .= $conjunction . convertNumberToWords($remainder);
                    }
                    break;
                default:
                    $baseUnit = pow(1000, floor(log($number, 1000)));
                    $numBaseUnits = (int) ($number / $baseUnit);
                    $remainder = $number % $baseUnit;
                    $string = convertNumberToWords($numBaseUnits) . ' ' . $dictionary[$baseUnit];
                    if ($remainder) {
                        $string .= $remainder < 100 ? $conjunction : $separator;
                        $string .= convertNumberToWords($remainder);
                    }
                    break;
            }

            if (null !== $fraction && is_numeric($fraction)) {
                $string .= $decimal;
                $words = array();
                foreach (str_split((string) $fraction) as $number) {
                    $words[] = $dictionary[$number];
                }
                $string .= implode(' ', $words);
            }

            return $string;
        }

        $amount_in_words = convertNumberToWords(number_format($total_amount, 2, '.', ''));
        ?>
            </td> 
            <td align="right">{{ number_format($total_cost, 2) }}
                <?php if ($cgst > 0 || $sgst > 0): ?>
         
               <p style="text-align: right;margin-top:164px; "> {{ number_format($cgst, 2) }}</p>  
                <p style="text-align: right; margin-top:0px">   {{ number_format($sgst, 2) }}</p>
              <?php elseif ($igst > 0): ?>
                <p style="text-align: right;"><br> <br><br> <br> <br> <br> <br> <br> {{ number_format($igst, 2) }}</p>
              <?php endif; ?>
            <br><br> </td>
        </tr>
        <tr colspan="2">
            <td align="center"><h3>Total Amount</h3></td>
            <td align="right"><h3> {{ number_format($total_amount, 2) }}</h3></td>
           
        </tr>
        <tr>
            <td><h4>Amount in words - INR <?php echo $amount_in_words; ?> Only</h4></td>
        </tr>
    </table>
    <!-- table 4 -->
    <table class="table4" width="98%" align="center" >
        <tr> <td><img style="padding-left: 140px;" src="https://tse1.mm.bing.net/th?id=OIP.fk94ZuiFaeI_fZe1wmDG6AHaHa&pid=Api&P=0&h=220" alt="" width="100px" hight="100px">
        </td> <td><h3>For, Tripxcia Trips LLP <br> <br> <br> Authorized Signatory </h3><td> 
       </tr>
        <tr><td># All Cheques should drawn in favour of  "Tripxcia Trips LLP" 
        </td><td>Bank Name - Kotak Mahindra</td></tr>
        <tr><td> # Payment within Due Date otherwise 21% Per Annum interset <br>
            will be charged</td><td>A/c No - 6049380547</td> </tr>
         <tr><td># Subject to Ahmedabad Jurisdiction</td> <td>IFSC Code - KKBK0002563</td></tr>
         <tr><td># Errors and Omissions Excepted</td> <td>Branch - Odhav Ring Road, Ahmedabad</td>
         </tr>
         <tr><td> <td>Payment by UPI ID - tripxcia@kotak</td></tr></td></tr>
        
    </table>
    <div class="line">
        <h3> <b>This is computer generated invoice no signature & sign required</b> </h3>
    </div>
</div>

<div style="text-align: center;">   <br> <br> <br> <br> <br> <br> <br> <br> <br> 
    <button id="printButton" style="background-color: #007bff; color: #fff; padding: 10px 20px; font-size: 18px; border: none; border-radius: 5px; cursor: pointer; margin-top:1px">
        Print
    </button> 
  </div> <br><br>
  
  <script>
    document.getElementById("printButton").addEventListener("click", function() {
        window.print();
    });
  </script>
  <?php echo " "; exit; ?>
    </body>

</html>
