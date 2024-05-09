<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body, html {
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    }
    .label-sec,
    .value-sec {
      display: inline-block;
      width: 70px;  
      margin-right: 20px;  
    }
    .label-sec {
      display: inline-block;
      width: 100px; /* Adjust the width as needed */
      margin-right: 20px;
      font-weight: bold; /* Add this line */
    }
    .container {
      display: flex;
      align-items: start;
    }
    .item {
      background-color: #F0F2F1;
      border: 1px solid #ccc;
      height: 250px;
      border-radius: 25px;
    }
    .header {
      font-weight: bold;
      font-size: 24px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
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
    .value-sec, .value-sec1 {
      font-weight: bold;
      width: 200px; /* Adjust the width as needed */
      overflow: hidden;
      white-space: nowrap;
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
    <div class="item" id="pass" style="background-color:rgb(226, 11, 11); color:white; border-radius: 25px;">
      <div class="header"> Airlines Roles----------------</div>
      <div class="row">
        <div class="col-md-4">
          <div class="to-sec">
            <div class="label-sec1">Role 1</div>
            <div class="value-sec1">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>Eum repudiandae, 
                reiciendis dolorem at . Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repudiandae</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="to-sec">
            <div class="label-sec1">Role 2</div>
            <div class="value-sec1">Lorem ipsum dolor sit amet <br> consectetur adipisicing elit. Eum repudiandae, 
                reiciendis <br> dolorem at delectus.Lorem ipsum dolorn <br> sit amet consectetur adipisicing elit. Eum repudiandae </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="to-sec">
            <div class="label-sec1">Role 3</div>
            <div class="value-sec1">Lorem ipsum dolor sit amet consectetur <br> adipisicing elit. Eum repudiandae,
                Lorem ipsum dolor <br> sit amet consectetur adipisicing elit. <br> Eum repudiandae 
                 .</div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="item text-white" id="ticket" style="background-color: rgb(51, 17, 245); color:white;border-radious:25px;">
      <div class="header">--- BOARDING PASS ---</div>
      <div class="main">
        <ul>
          <li class="to-sec">
            <span class="label-sec">Flight</span>
            <span class="value-sec">I 124</span>
          </li>
          <li class="to-sec">
            <span class="label-sec">Gate</span>
            <span class="value-sec"> D4</span>
          </li>
          <li class="to-sec">
            <span class="label-sec">Seat</span>
            <span class="value-sec">31 B</span>
          </li>
          <li class="to-sec">
            <span class="label-sec">Class</span>
            <span class="value-sec">E</span>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</body>
</html>
