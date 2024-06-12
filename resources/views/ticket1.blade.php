<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<br/>
<style type="text/css">
<!--
	p {margin: 0; padding: 0;}	.ft10{font-size:31px;font-family:Times;color:#ffffff;}
	.ft11{font-size:20px;font-family:Times;color:#000000;}
	.ft12{font-size:20px;font-family:Times;color:#000000;}
	.ft13{font-size:20px;font-family:Times;color:#000000;}
	.ft14{font-size:24px;font-family:Times;color:#ffffff;}
	.ft15{font-size:19px;font-family:Times;color:#b3251b;}
	.ft16{font-size:19px;font-family:Times;color:#000000;}
	.ft17{font-size:37px;font-family:Times;color:#ffffff;}
	.ft18{font-size:14px;font-family:Times;color:#000000;}
	.ft19{font-size:15px;font-family:Times;color:#000000;}
	.ft110{font-size:15px;font-family:Times;color:#000000;}
	.ft111{font-size:14px;font-family:Times;color:#000000;}
	.ft112{font-size:15px;font-family:Times;color:#ff0000;}
	.ft113{font-size:11px;font-family:Times;color:#ffffff;}
	.ft114{font-size:42px;font-family:Times;color:#ffffff;}
	.ft115{font-size:11px;line-height:15px;font-family:Times;color:#000000;}
	.ft116{font-size:11px;line-height:16px;font-family:Times;color:#000000;}
	.ft117{font-size:11px;line-height:21px;font-family:Times;color:#000000;}
	@media print {
        #printButton {
            display: none;
        }
    }
-->
</style>
</head>
<body bgcolor="#A0A0A0" vlink="blue" link="blue">
<div id="page1-div" style="position:relative;width:1440px;height:1015px;">

<img width="1440" height="1015" src="{{asset('assets/ticket/design/images/scr 2.png')}}" alt="background image"/>

<p style="position:absolute;top:133px;left:412px;white-space:nowrap" class="ft10">..............................................</p>
<p style="position:absolute;top:216px;left:162px;white-space:nowrap" class="ft11">PASSENGER NAME</p>
<?php if($vendor->ticket->gender == 'male'): ?>
<p style="position:absolute;top:255px;left:166px;white-space:nowrap" class="ft11">Mr.{{@$vendor->ticket->passenger_name}}</p>
<?php elseif($vendor->ticket->gender == 'female'): ?>
<p style="position:absolute;top:255px;left:166px;white-space:nowrap" class="ft11">Mrs.{{@$vendor->ticket->passenger_name}}</p>
<?php elseif($vendor->ticket->gender == 'infant'): ?>

<p style="position:absolute;top:255px;left:166px;white-space:nowrap" class="ft11">{{@$vendor->ticket->passenger_name}}</p>

<?php endif; ?>
<p style="position:absolute;top:290px;left:166px;white-space:nowrap" class="ft11">FROM</p>
<p style="position:absolute;top:319px;left:166px;white-space:nowrap" class="ft11">{{@$vendor->service->from_location}};&#160; {{@$vendor->arrival_time}}</p>
<p style="position:absolute;top:352px;left:166px;white-space:nowrap" class="ft11">TO</p>
<p style="position:absolute;top:383px;left:166px;white-space:nowrap" class="ft11">{{@$vendor->service->to_location}} ;&#160; {{@$vendor->departure_time}}</p>
<p style="position:absolute;top:278px;left:420px;white-space:nowrap" class="ft11">DATE</p>
<p style="position:absolute;top:277px;left:483px;white-space:nowrap" class="ft12">{{date('d-m-Y',strtotime(@$vendor->service->departure_date))}}</p>
<p style="position:absolute;top:226px;left:420px;white-space:nowrap" class="ft11">TIME</p>
<p style="position:absolute;top:230px;left:481px;white-space:nowrap" class="ft12">{{@$vendor->departure_time}}</p>
<p style="position:absolute;top:320px;left:420px;white-space:nowrap" class="ft13">PNR No.</p>
 <p style="position:absolute;top:320px;left:499px;white-space:nowrap" class="ft12">{{@$vendor->ticket->pnr_number}}</p>


<p style="position:absolute;top:420px;left:171px;white-space:nowrap" class="ft15">IMPORTANT&#160;NOTE:</p>
<p style="position:absolute;top:420px;left:349px;white-space:nowrap" class="ft16">&#160;You should be at the boarding gate before 1 hour</p>
<p style="position:absolute;top:73px;left:956px;white-space:nowrap" class="ft10">...</p>
<p style="position:absolute;top:143px;left:988px;white-space:nowrap" class="ft17">E Ticket</p>
<p style="position:absolute;top:143px;left:1136px;white-space:nowrap" class="ft10">...</p>
<p style="position:absolute;top:213px;left:901px;white-space:nowrap" class="ft18">PASSENGER</p>
<p style="position:absolute;top:213px;left:1006px;white-space:nowrap" class="ft11">Mr.{{@$vendor->ticket->passenger_name}}</p>
<p style="position:absolute;top:248px;left:902px;white-space:nowrap" class="ft18">FROM</p>
<p style="position:absolute;top:248px;left:1006px;white-space:nowrap" class="ft11">{{@$vendor->service->from_location}}</p>
<p style="position:absolute;top:285px;left:902px;white-space:nowrap" class="ft18">TO</p>
<p style="position:absolute;top:285px;left:1009px;white-space:nowrap" class="ft11">{{@$vendor->service->to_location}}</p>
<p style="position:absolute;top:320px;left:929px;white-space:nowrap" class="ft19">FLIGHT</p>
<p style="position:absolute;top:341px;left:945px;white-space:nowrap" class="ft110"><b>{{@$vendor->flight_number}}</b></p>

  
<p style="position:absolute;top:483px;left:452px;white-space:nowrap" class="ft10">...................................</p>
<p style="position:absolute;top:583px;left:171px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:171px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>  fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa.</p>
<p style="position:absolute;top:583px;left:418px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:412px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>a umque velit adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa.</p>
<p style="position:absolute;top:583px;left:666px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:674px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut,atis.</p>
<p style="position:absolute;top:489px;left:940px;white-space:nowrap" class="ft12">FLIGHT</p>
<p style="position:absolute;top:489px;left:1134px;white-space:nowrap" class="ft12">{{@$vendor->flight_number}}</p> 
<p style="position:absolute;top:550px;left:940px;white-space:nowrap" class="ft12">SEAT</p>
<p style="position:absolute;top:550px;left:1134px;white-space:nowrap" class="ft12">{{@$vendor->ticket->seat_number}}</p>
<p style="position:absolute;top:608px;left:940px;white-space:nowrap" class="ft12">CLASS</p>
<p style="position:absolute;top:605px;left:1134px;white-space:nowrap" class="ft12">{{@$vendor->ticket->flight_class}}</p>
<div style="text-align: center;">
    <button id="printButton" style="background-color: #007bff; color: #fff; padding: 10px 20px; font-size: 18px; border: none; border-radius: 5px; cursor: pointer;margin-top:1px">
        Print
    </button>
</div> 
</div>



<script>
    document.getElementById("printButton").addEventListener("click", function() {
        window.print();
    });
</script>

<?php echo " "; exit; ?>
</body>
</html>
