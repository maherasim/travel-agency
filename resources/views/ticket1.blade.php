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
	.ft12{font-size:48px;font-family:Times;color:#b54242;}
	.ft13{font-size:20px;font-family:Times;color:#ffffff;}
	.ft14{font-size:24px;font-family:Times;color:#ffffff;}
	.ft15{font-size:19px;font-family:Times;color:#b3251b;}
	.ft16{font-size:19px;font-family:Times;color:#000000;}
	.ft17{font-size:37px;font-family:Times;color:#ffffff;}
	.ft18{font-size:14px;font-family:Times;color:#000000;}
	.ft19{font-size:15px;font-family:Times;color:#ffffff;}
	.ft110{font-size:19px;font-family:Times;color:#000000;}
	.ft111{font-size:24px;font-family:Times;color:#000000;}
	.ft112{font-size:15px;font-family:Times;color:#ff0000;}
	.ft113{font-size:11px;font-family:Times;color:#ffffff;}
	.ft114{font-size:42px;font-family:Times;color:#ffffff;}
	.ft115{font-size:11px;line-height:15px;font-family:Times;color:#ffffff;}
	.ft116{font-size:11px;line-height:16px;font-family:Times;color:#ffffff;}
	.ft117{font-size:11px;line-height:21px;font-family:Times;color:#ffffff;}
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

<img width="1440" height="1015" src="{{asset('assets/ticket/design/images/target001.png')}}" alt="background image"/>

<p style="position:absolute;top:33px;left:382px;white-space:nowrap" class="ft10">..............................................</p>
<p style="position:absolute;top:144px;left:101px;white-space:nowrap" class="ft11">PASSENGER NAME</p>
<p style="position:absolute;top:185px;left:106px;white-space:nowrap" class="ft11">Mr.{{@$vendor->ticket->gate}}</p>
<p style="position:absolute;top:225px;left:101px;white-space:nowrap" class="ft11">FROM</p>
<p style="position:absolute;top:266px;left:106px;white-space:nowrap" class="ft11">{{@$vendor->service->from_location}}</p>
<p style="position:absolute;top:306px;left:101px;white-space:nowrap" class="ft11">TO</p>
<p style="position:absolute;top:347px;left:106px;white-space:nowrap" class="ft11">{{@$vendor->service->to_location}}</p>
<p style="position:absolute;top:158px;left:400px;white-space:nowrap" class="ft11">DATE</p>
<p style="position:absolute;top:144px;left:463px;white-space:nowrap" class="ft12">{{date('d-m-Y',strtotime(@$vendor->service->departure_date))}}</p>
<p style="position:absolute;top:216px;left:400px;white-space:nowrap" class="ft11">TIME</p>
<p style="position:absolute;top:202px;left:461px;white-space:nowrap" class="ft12">{{@$vendor->departure_time}}</p>
<p style="position:absolute;top:263px;left:510px;white-space:nowrap" class="ft13">PNR No.</p>
<p style="position:absolute;top:294px;left:512px;white-space:nowrap" class="ft14">{{@$vendor->ticket->pnr_number}}</p>

<p style="position:absolute;top:386px;left:101px;white-space:nowrap" class="ft15">IMPORTANT&#160;NOTE:</p>
<p style="position:absolute;top:386px;left:291px;white-space:nowrap" class="ft16">&#160;You should be at the boarding gate before 20:05</p>
<p style="position:absolute;top:33px;left:956px;white-space:nowrap" class="ft10">...</p>
<p style="position:absolute;top:34px;left:988px;white-space:nowrap" class="ft17">E Ticket</p>
<p style="position:absolute;top:33px;left:1296px;white-space:nowrap" class="ft10">...</p>
<p style="position:absolute;top:133px;left:951px;white-space:nowrap" class="ft18">PASSENGER</p>
<p style="position:absolute;top:131px;left:1067px;white-space:nowrap" class="ft11">Mr.{{@$vendor->ticket->gate}}</p>
<p style="position:absolute;top:178px;left:951px;white-space:nowrap" class="ft18">FROM</p>
<p style="position:absolute;top:176px;left:1064px;white-space:nowrap" class="ft11">{{@$vendor->service->from_location}}</p>
<p style="position:absolute;top:223px;left:951px;white-space:nowrap" class="ft18">TO</p>
<p style="position:absolute;top:221px;left:1065px;white-space:nowrap" class="ft11">{{@$vendor->service->to_location}}</p>
<p style="position:absolute;top:269px;left:975px;white-space:nowrap" class="ft19">FLIGHT</p>
<p style="position:absolute;top:301px;left:973px;white-space:nowrap" class="ft110"><b>{{@$vendor->flight_number}}</b></p>
<p style="position:absolute;top:269px;left:1175px;white-space:nowrap" class="ft13">PNR Number</p>
<p style="position:absolute;top:301px;left:1175px;white-space:nowrap" class="ft110"><b>{{@$vendor->ticket->pnr_number}}</b></p>

  
<p style="position:absolute;top:473px;left:382px;white-space:nowrap" class="ft10">................................................</p>
<p style="position:absolute;top:583px;left:114px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:101px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis facere ut, quos delectus<br/>commodi in cumque velit dolore facilis<br/>harum.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa.</p>
<p style="position:absolute;top:583px;left:395px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:382px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis facere ut, quos delectus<br/>commodi in cumque velit dolore facilis<br/>harum.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa.</p>
<p style="position:absolute;top:583px;left:676px;white-space:nowrap" class="ft115">Boarding<br/>Rules</p>
<p style="position:absolute;top:625px;left:664px;white-space:nowrap" class="ft116">Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis facere ut, quos delectus<br/>commodi in cumque velit dolore facilis<br/>harum.<br/>Lorem ipsum dolor sit amet consectetur<br/>adipisicing elit. Sequi est autem ipsa<br/>doloribus fugit!&#160;Aut, provident totam enim<br/>obcaecati perspiciatis.</p>
<p style="position:absolute;top:479px;left:1000px;white-space:nowrap" class="ft17">FLIGHT</p>
<p style="position:absolute;top:476px;left:1194px;white-space:nowrap" class="ft114">{{@$vendor->flight_number}}</p> 
<p style="position:absolute;top:550px;left:1000px;white-space:nowrap" class="ft17">SEAT</p>
<p style="position:absolute;top:550px;left:1194px;white-space:nowrap" class="ft114">{{@$vendor->ticket->seat_number}}</p>
<p style="position:absolute;top:608px;left:1000px;white-space:nowrap" class="ft17">CLASS</p>
<p style="position:absolute;top:605px;left:1194px;white-space:nowrap" class="ft114">{{@$vendor->ticket->flight_class}}</p>
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
