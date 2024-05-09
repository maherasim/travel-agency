<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    body, html {
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    }
    .container {
      display: flex;
      /* border: 1px solid; */
      /* flex-direction: column;  */
      align-items: start;
    }
    .item {
        background-color: #F0F2F1;
      border: 1px solid #ccc;
      height: 250px;
      border-radius: 10px;
      /* padding: 20px; */
      /* margin: 10px; */
    }
    .header {
      font-weight: bold;
      font-size: 24px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 13px 5px;
      background-color: #db0505;
      color: white;
      margin-bottom: 10px;
    }
    .main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
    }
    .footer{
      padding: 0 10px;
      text-align: center;



    }
    .main2 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .value-sec, .value-sec2 {
      font-weight: bold;
    }
    .square {
      display: inline-block;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .footer {
      font-style: italic;
      margin-top: 10px;
    }
    .flight-gate-seat{
      background-color: red;
    }
    #date1{
      color: red;
      font-size: 30px;
      font-family: 'Times New Roman', Times, serif;
    }
    #date11{
      font-size: 30px;
    }
    .time{
      font-size: 25px;
    }
    #mint{
      font-size: 30px;
      color: red;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="item" id="pass">
      <div class="header"> Air lines----------------</div>
      <div class="main">
        <div class="left">
          <div class="name-sec">
            <div class="label-sec">PASSENGER NAME</div>
            <div class="value-sec">Mr. John Doe</div>
          </div>
          <div class="from-sec">
            <div class="label-sec">FROM</div>
            <div class="value-sec">New York, USA</div>
          </div>
          <div class="to-sec">
            <div class="label-sec">TO</div>
            <div class="value-sec">Rome, Spain</div>
          </div>
        </div>
        <div class="center">
          <div class="date">
            <span id="date11">DATE :</span>
            <span id="date1">11.03.17</span>
          </div>
          <div class="time">
            <span>TIME : &nbsp;</span>
            <span id="mint">21:25</span>
          </div>
          <div class="flight-gate-seat">
            <div class="square">FLIGHT I124</div>
            <div class="square">GATE D4</div>
            <div class="square">SEAT 31B</div>
          </div>
        </div>
        <div class="right">
          <img src="put bar" alt="bar code" />
        </div>
      </div>
      <div class="footer">
        Important Note: You should be at the boarding gate before 20:05
      </div>
    </div>
    <div class="item" id="ticket">
      <div class="header">--- BOARDING PASS ---</div>
      <div class="main2">
        <div>
          <div class="name-sec2">
            <div class="label-sec2">PASSENGER NAME</div>
            <div class="value-sec2">Mr. John Doe</div>
          </div>
          <div class="from-sec2">
            <div class="label-sec2">FROM</div>
            <div class="value-sec2">New York, USA</div>
          </div>
          <div class="to-sec2">
            <div class="label-sec2">TO</div>
            <div class="value-sec2">Rome, Spain</div>
          </div>
        </div>
        <div class="route">
          JSK -> ROM
        </div>
        <div class="logo">
          <img src="" alt="">
          <span>Air Lines</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
