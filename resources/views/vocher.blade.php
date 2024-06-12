<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voucher</title>
    <!-- <link rel="stylesheet" href="style.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: rgb(224, 224, 224);
}

p {
  font-size: 12px !important;
}
@media print {
  .print-margin-none {
                margin: 0 !important;
            }
        #printButton {
            display: none;
        }
        
    }

ul li {
  font-size: 12px !important;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin: 4rem auto;
  padding: 1rem;
}

.ticket-container {
  width: 95%;
  background-color: white;
}

.ticket-content {
  margin: 2rem;
}

.checked {
  font-size: 15px !important;
}

.Top-profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-left: 2rem;
  margin-right: 2rem; */
}

.Top-profile img {
  height: 55px;
  width: 235px;
}

.profile h2 {
  margin-bottom: 8px;
}

.profile ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.profile ul li {
  font-size: 16px;
  color: black;
  line-height: 1.5rem;
}

.booking-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  /* margin-left: 3rem;
  margin-right: 3rem; */
}

#Booking-id h3,
#booking-pnr h3,
#booking-date h3 {
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 6px;
}

#Booking-id p,
#booking-pnr p,
#booking-date p {
  font-size: 20px;
  font-weight: bold;
}

#confirm-btn button {
  height: 40px;
  padding: 8px;
  border: none;
  border-radius: 20px;
  background-color: rgb(138, 252, 138);
  color: green;
}

#confirm-btn button i {
  margin-right: 10px;
  font-size: 18px;
}

.ratings-details {
  display: flex;
}

#top-heading h3 {
  /* font-size: 22px; */
  margin-top: 1.5rem;
  margin-bottom: 3px;
}

#top-heading h3 span {
  font-size: 24px;
  font-weight: 800;
}

#top-heading p {
  font-size: 2.6rem;
  margin-top: 3px;
  font-weight: 600;
  color: rgb(18, 2, 32);
}

#top-heading p span {
  font-size: 1.5rem;
  color: black;
  margin-bottom: 2rem;
}

.rating-btn {
  display: flex;
  justify-content: flex-end;
}

.rating-btn button {
  height: 3rem;
  background-color: rgb(134, 134, 235);
  border: none;
  color: blue;
  font-size: 16px;
  padding: 8px;
  /* margin-right: 4rem; */
  border-radius: 6px;
}

.rating-btn button i {
  margin-right: 16px;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-content ul li {
  list-style: none;
  font-size: 20px;
}

.check-point {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  /* margin-left: 3rem;
  margin-right: 2rem; */
}

.check-point img {
  height: 10rem;
}


.check-in h3 {
  /* font-size: 22px;
  font-weight: 500; */
  margin-bottom: 3px;
}

.check-in h2 {
  /* font-size: 30px;
  font-weight: 600; */
  margin-bottom: 3px;
}

.check-in p {
  font-size: 22px;
  margin-bottom: 3px;
}

.check-out h3 {
  /* font-size: 22px;
  font-weight: 500; */
  margin-bottom: 3px;
}

.check-out h2 {
  /* font-size: 30px;
  font-weight: 600; */
  margin-bottom: 3px;
}

.check-out p {
  font-size: 22px;
  margin-bottom: 3px;
}

#last-p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-bottom: 4rem;
}

#last-p span {
  font-size: 21px;
  font-weight: 600;
}

.rooms-collection {
  display: flex;
  flex-direction: column;
  /* margin-left: 3rem; */
  gap: 5px;
}

.room-one h3 {
  font-size: 22px;
  font-weight: 300;
}

.room-one h3 span {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 3px;
}

.room-one p {
  font-size: 18px;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.room-one i {
  font-size: 18px;
  margin-bottom: 3px;
  margin-top: 3px;
  margin-left: 3px;
}

.rooms-collection h2 {
  font-size: 18px;
  font-weight: 300;
  margin-top: 5px;
}

.rooms-collection h2 span {
  font-size: 20px;
  font-weight: 500;
  margin-top: 5px;
}

.room-two {
  margin-top: 2rem;
}

.room-two h3 {
  font-size: 22px;
  font-weight: 300;
}

.room-two h3 span {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 3px;
}

.room-two p {
  font-size: 18px;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.room-two i {
  font-size: 18px;
  margin-bottom: 3px;
  margin-top: 3px;
  margin-left: 3px;
}

.guest-details {
  display: flex;
  flex-direction: column;
  /* margin-left: 3rem; */
  margin-top: 2rem;
}

.guest-details h3 {
  font-size: 22px;
  font-weight: 800;
}

.guest-details p {
  font-size: 18px;
  margin-top: 0.5rem;
}

.important-info {
  display: flex;
  flex-direction: column;
  /* margin-left: 3rem; */
  margin-top: 2rem;
  justify-content: center;
}

#info-btn button {
  width: 20%;
  height: 3rem;
  background-color: pink;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  margin-right: 3px;
}

#info-btn button i {
  margin-right: 10px;
  font-size: 18px;
}

.guest-list {
  width: 90%;
  background-color: rgb(239, 208, 213);
  margin-left: 3rem;
  margin-top: 3rem;
  line-height: normal;
}

.guest-list ul li {
  font-size: 25px;
}

#id-proof span {
  /* font-size: 22px; */
  font-weight: 600;
  margin-top: 4px;
}

#one ul li,
#two ul li,
#three ul li {
  font-size: 20px;
  margin-left: 2rem;
}

@media print {
  @page {
    size: "A4" !important;
    margin: 0 !important;
  }

  .ticket-container {
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .body {
    background-color: rgb(224, 224, 224) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>

<body>
    <main>
        <div class="ticket-container">
            <div class="ticket-content">
        <div class="Top-profile">
            <div class="logo">
                <img src="https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png" alt="Tripxcia">
            </div>
            <div class="profile">
                <h2>Tripxcia Trips LLP</h2>
                <ul>
                    <li>27 Alfa Bazar, 100 Feet</li>
                    <li>Road, Praladhngar</li>
                    <li>Contact Number-6352428105</li>
                    {{-- <li>Email ID-ota@tripxcia.com</li> --}}
                </ul>
            </div>
        </div>
        <hr>

        <div class="booking-details">
            <div id="Booking-id">
                <h3>Booking-id</h3>
                
                <p>{{@$vendor->ticket->booking_id}} </p>
            </div>
           
            <div id="booking-date">
                <h3>Booking Date</h3>
                <p>{{ $vendor->ticket->booking_date ?? 'N/A' }}</p>
            </div>
            <div id="confirm-btn">
                <button><i class="fa-solid fa-circle-check"></i>BOOKING CONFIRMED</button>
            </div>
        </div>
        <hr>
        <div class="ratings-details">
          <div id="top-heading">
              <h3>{{@$vendor->guest_name}} | <span>{{@$vendor->service->night}} Nights</span></h3>
              <h3>{{@$vendor->hotel_address}} 
           @for ($i = 0; $i < $vendor->service->hotel_category; $i++)
              <span class="fa fa-star checked"></span>
          @endfor
          </h3>
          </div>
      </div>
        <div class="rating-btn">
            <button><i class="fa-solid fa-location-dot"></i>Get Directions</button>
        </div>
        <div class="detail-content">
            <ul>
                <li>{{@$vendor->hotel_address}} </li>
                <li> Email -{{@$vendor->ticket->email}}</li>
                <li>Contact Number - {{@$vendor->ticket->contact_no}}</li>
                {{-- <li>Email ID
                    -reservations@rdkarjat.com,rajendra.barapatre@rdkarjat.com,anil.gharat@rdkarjat.com,<br>dutymanager@rdkarjat.com,frontdesk@rdkarjat.com
                </li> --}}
            </ul>
        </div>

        <div class="check-point">
            <img src="https://up.yimg.com/ib/th?id=OIP.FMRA3f5nT3IDB1GDsUEf6QHaEK&pid=Api&rs=1&c=1&qlt=95&w=218&h=122" alt="Resturant">
            <div class="check-in">
                <h3>Check In</h3>

                <h2>{{@$vendor->ticket->arrival_time}}</h2>
                <p>{{@$vendor->check_in}}</p>
            </div>

            <div class="check-out">
                <h3>Check Out</h3>
                <h2>{{@$vendor->ticket->departure_time}}</h2>
                <p>{{@$vendor->check_out}}</p>
            </div>
        </div>
        <p id="last-p"><span>Reservation for -</span> {{@$vendor->guest_name}} + 4 Others</p>

        <div class="rooms-collection">
            @php
                $roomCategories = json_decode($vendor->room_category);
            @endphp
            @for($i = 0; $i < $vendor->service->no_rooms; $i++)
                <div class="room-one">
                    <h3><span>Room {{ $i + 1 }} -</span>{{ $roomCategories[$i] ?? 'N/A' }}</h3>
                    <p><i class="fa-solid fa-user"></i>{{ $vendor->service->no_adults }}(s) Adults, {{ $vendor->service->no_kidssix }} Children</p>
                </div>
                <hr>
                <h2><span>Meal Plan</span>- {{ $vendor->service->meal_plan }}</h2>
            @endfor
        </div>

        <div class="guest-details">
            <h3>Guest Details ({{ $vendor->service->no_guests }})</h3>
            <p><span>{{ $vendor->guest_name ?? 'N/A' }}</span> (Primary Guest) + {{ $vendor->service->no_guests}}</p>
        </div>

        <div class="important-info">
            <div id="info-btn">
                <button><i class="fa-solid fa-clock"></i>IMPORTANT INFORMATION</button>
                <div class="guest-list">
                    <ul id="one">
                        <li id="id-proof"> <span>ID Proof Related</span>
                            <ul>
                                <li>Passport, Aadhar and Driving License are accepted as ID proof(s)</li>
                                <li>Local ids are allowed
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul id="two">
                        <li id="id-proof"> <span>Must read</span>
                            <ul>
                                <li>Mandatory : Deposit: INR 500 per day|Christmas Eve (24 December) Gala Dinner per
                                    adult:
                                    INR 10000|Christmas Eve (24 December) Gala Dinner per child: INR 5000 (from 6 to 12
                                    years old)|New Year's Eve (31 December) Gala Dinner per adult: INR 10000|New Year's
                                    Eve (31 December) Gala Dinner per child: INR 3000 (from 6 to 17 years old)
                                </li>
                                <li>Optional : Fee for buffet breakfast: approximately INR 999 for adults and INR 699
                                    for
                                    children|Airport shuttle fee: INR 7000 per vehicle (one-way)</li>

                            </ul>
                        </li>
                    </ul>

                    <ul id="three">
                        <li id="id-proof"> <span>Guest Profile</span>
                            <ul>
                                <li> Unmarried couples are not allowed</li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
    </main>
    <div style="text-align: center;">
      <button id="printButton" style="background-color: #007bff; color: #fff; padding: 10px 20px; font-size: 18px; border: none; border-radius: 5px; cursor: pointer;margin-top:1px">
          Print
      </button>
  </div> 
  
  <script>
      document.getElementById("printButton").addEventListener("click", function() {
          window.print();
      });
  </script>
  <?php echo " "; exit; ?>
</body>

</html>
