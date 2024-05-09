<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> -->
    <style>
        @media (min-width: 1200px) {
            .container, .container-lg, .container-md, .container-sm, .container-xl {
                max-width: 1140px !important;
            }
        }
        @media (min-width: 992px) {
            .container, .container-lg, .container-md, .container-sm {
                max-width: 960px;
            }
        }
        @media (min-width: 768px) {
            .container, .container-md, .container-sm {
                max-width: 720px;
            }
        }
        @media (min-width: 576px) {
            .container, .container-sm {
                max-width: 540px;
            }
        }
        .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
        .mt-3, .my-3 {
            margin-top: 1rem !important;
        }
        .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        }
        .p-0 {
            padding: 0 !important;
        }
        @media (min-width: 768px) {
            .col-md-8 {
                -ms-flex: 0 0 66.666667%;
                flex: 0 0 66.666667%;
                max-width: 66.666667%;
            }
        }
        .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }
        .card {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, .125);
            border-radius: .25rem;
        }
        .flex-wrap {
            -ms-flex-wrap: wrap !important;
            flex-wrap: wrap !important;
        }
        .card-header {
            padding: .75rem 1.25rem;
            margin-bottom: 0;
            background-color: rgba(0, 0, 0, .03);
            border-bottom: 1px solid rgba(0, 0, 0, .125);
        }
        .card-body {
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            min-height: 1px;
            padding: 1.25rem;
        }
        .card {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, .125);
            border-radius: .25rem;
        }
        .justify-content-between {
            -ms-flex-pack: justify !important;
            justify-content: space-between !important;
        }
        .flex-wrap {
            -ms-flex-wrap: wrap !important;
            flex-wrap: wrap !important;
        }
        .d-flex {
            display: -ms-flexbox !important;
            display: flex !important;
        }
        .flex-wrap {
            -ms-flex-wrap: wrap !important;
            flex-wrap: wrap !important;
        }
        .flex-column {
            -ms-flex-direction: column !important;
            flex-direction: column !important;
        }
        .d-flex {
            display: -ms-flexbox !important;
            display: flex !important;
        }
        .h5, h5 {
            font-size: 1.25rem;
        }
        .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            margin-bottom: .5rem;
            font-weight: 500;
            line-height: 1.2;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 0;
            margin-bottom: .5rem;
        }
        *, ::after, ::before {
            box-sizing: border-box;
        }
        .align-items-center {
            -ms-flex-align: center !important;
            align-items: center !important;
        }

        element.style {
        }
        .timer {
            color: #B64343;
            margin-bottom: 0px;
        }
        .timer {
            font-size: 45px;
        }
        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        img {
            vertical-align: middle;
            border-style: none;
        }
        .mb-0, .my-0 {
            margin-bottom: 0 !important;
        }
        .p-0 {
            padding: 0 !important;
        }
        @media (min-width: 768px) {
            .col-md-4 {
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
            }
        }
        .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }
        .w-100 {
            width: 100% !important;
        }
        .m-auto {
            margin: auto !important;
        }
        .pb-1, .py-1 {
            padding-bottom: .25rem !important;
        }
        .pt-1, .py-1 {
            padding-top: .25rem !important;
        }

        .mb-3, .my-3 {
            margin-bottom: 1rem !important;
        }
        .mt-3, .my-3 {
            margin-top: 1rem !important;
        }

        .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }
        .pl-2, .px-2 {
            padding-left: .5rem !important;
        }
        .mb-1, .my-1 {
            margin-bottom: .25rem !important;
        }
        .pt-5, .py-5 {
            padding-top: 3rem !important;
        }
        .text-white {
            color: #fff !important;
        }
        .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            margin-bottom: .5rem;
            font-weight: 500;
            line-height: 1.2;
        }
        .pt-2, .py-2 {
            padding-top: .5rem !important;
        }
        @media (min-width: 768px) {
            .col-md-4 {
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
            }
        }
                body{
            background: #323033;
        }
        .card-header{
            background: #D62A1F;
            border-radius: calc(22px - 1px) calc(22px - 1px) 0 0 !important;
            display: flex;
            /* align-items: center; */
            /* gap: 4px; */
        }
        .h-75{
            height: 75px;
        }
        .logo-img{
            width: 250px;
        }
        .heading-h5{
            font-size: 30px;
            letter-spacing: 2px;
            color: #fff;
        }
        .card {
            border: 0px solid transparent;
            border-radius: 22px;
        }
        .plane-icon{
            font-size: 30px;
            transform: rotate(88deg);
            color: #fff;
            line-height: inherit;
        }
        .heading-h6{
            font-size: 35px;
            /* letter-spacing: 2px;      */
            text-transform: uppercase;
            color: #fff;
        }
        .passanger-heading{
            text-transform: uppercase;
        }
        .heading-john{
            background: #D4E0F7;
            padding: 4px;
        }
        .timer{
            font-size: 45px;
        }
        .timer{
            color: #B64343;
            margin-bottom: 0px;
        }
        .gap-5{
            gap: 5px;
        }
        .flight-heading{
            margin-bottom: 0px;
        }
        .fs-24{
            font-size: 24px;
            margin-bottom: 0px;
        }
        .gate-bg{
            background: #DE2B21;
            padding: 2px 15px;
            color: #fff;
        }
        .flight-bg{
            background: #B3261C;
            padding: 2px 15px;
            color: #fff;
        }
        .fs-19{
            font-size: 19px;
        }
        .seat-bg{
            padding: 2px 25px;
        }
        .date-h5{
            border-bottom: 5px solid #D2D2D2;
            margin-bottom: 0px;
        }
        .bars-img{
            height: 205px;
        }
        .fs-15{
            font-size: 15px;
        }
        .w-200{
            width: 220px;
            background: #fff;

        }
        .gap-15{
            gap: 15px;
        }
        .ml-39{
            margin-left: 39px;
            background: #fff;
        }
        .ml-48{
            margin-left: 63px;
            background: #fff;

        }
        .fs-40{
            font-size: 40px;
        }
        .gap-65{
            gap: 65px;
        }
        .fs-30{
            font-size: 35px;
        }
        .fs-12{
            font-size: 12px;
        }
    @media screen and (max-width:767px) {
        .heading-h5 {
            font-size: 22px;
        }

            .w-200 {
                width: max-content;
        }
        .heading-h6 {
            font-size: 29px;
        }
        .bars{
            justify-content: center;
            align-items: center;
            margin: auto;
            padding-top: 10px;
        }
    }
    </style>


</head>
<body>
@php
    $parcelPictureFilepath=public_path('assets/ticket/design/images/logo-removebg-preview.png');
    $mime_type = mime_content_type($parcelPictureFilepath);
    $image_data = file_get_contents($parcelPictureFilepath);
    $picture = 'data:' . $mime_type . ';base64,' . base64_encode($image_data);

    $parcelPictureFilepath1=public_path('assets/ticket/design/images/bars.png');
    $mime_type1 = mime_content_type($parcelPictureFilepath1);
    $image_data1 = file_get_contents($parcelPictureFilepath1);
    $picture1 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data1);

    $parcelPictureFilepath2=public_path('assets/ticket/design/images/gfk.png');
    $mime_type2 = mime_content_type($parcelPictureFilepath2);
    $image_data2 = file_get_contents($parcelPictureFilepath2);
    $picture2 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data2);

    $parcelPictureFilepath3=public_path('assets/ticket/design/images/black-logo.png');
    $mime_type3 = mime_content_type($parcelPictureFilepath3);
    $image_data3 = file_get_contents($parcelPictureFilepath3);
    $picture3 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data3);

    $parcelPictureFilepath4=public_path('assets/ticket/design/images/red-logo.png');
    $mime_type4 = mime_content_type($parcelPictureFilepath4);
    $image_data4 = file_get_contents($parcelPictureFilepath4);
    $picture4 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data4);

    $parcelPictureFilepath5=public_path('assets/ticket/design/images/logo-removebg-preview.png');
    $mime_type5 = mime_content_type($parcelPictureFilepath5);
    $image_data5 = file_get_contents($parcelPictureFilepath5);
    $picture5 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data5);

    $parcelPictureFilepath6=public_path('assets/ticket/design/images/blue-bar.png');
    $mime_type6 = mime_content_type($parcelPictureFilepath6);
    $image_data6 = file_get_contents($parcelPictureFilepath6);
    $picture6 = 'data:' . $mime_type . ';base64,' . base64_encode($image_data6);
@endphp

    <div class="container fluid">
        <div class="row mt-3">
            <div class="col-md-8 p-0">
                <div class="card">

                    <div class="card-header flex-wrap">
                     <img src="{!! $picture !!}" class="logo-img">
                     <h5 class="heading-h5">..............................................</h5>
                     <i class='bx bxs-plane plane-icon'></i>
                    </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex flex-column flex-wrap" >
                        <h5 class="passanger-heading"><i class='bx bx-id-card'></i> Passenger Name</h5>
                        <h5 class="heading-john">{{@$vendor->service->passenger_name}}</h5>
                        <h5 class="passanger-heading"><i class='bx bxs-plane-take-off'></i> From</h5>
                        <h5 class="heading-john">{{@$vendor->service->from_location	}}</h5>

                        <h5 class="passanger-heading"><i class='bx bxs-plane-land'></i> TO</h5>
                        <h5 class="heading-john">{{@$vendor->service->to_location	}}</h5>
                    </div>
                        <div class="date-area d-flex flex-column flex-wrap">
                            <div class="d-flex align-items-center gap-5">
                            <h5 class="date-h5">DATE</h5>
                            <p class="timer"> {{date('d-m-Y',strtotime(@$vendor->service->departure_date)) }}</p>
                        </div>
                        <div class="d-flex align-items-center gap-5 flex-wrap">
                            <h5 class="date-h5">TIME</h5>
                            <p class="timer">{{@$vendor->departure_time}}</p>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex align-items-center flex-column gap-5 flight-bg flex-wrap">
                            <h5 class="flight-heading">FLIGHT</h5>
                            <p class="fs-24">{{@$vendor->flight_number}}</p>
                        </div>
                            <div class="d-flex align-items-center flex-column gap-5 gate-bg flex-wrap">
                                <h5 class="flight-heading">GATE</h5>
                                <p class="fs-24">{{@$vendor->gate}}</p>
                            </div>
                            <div class="d-flex align-items-center flex-column gap-5 flight-bg seat-bg flex-wrap">
                                <h5 class="flight-heading">SEAT</h5>
                                <p class="fs-24">{{@$vendor->seat_number}}</p>
                            </div>
                        </div>
                        </div>

                        <div class="bars d-flex">
                            <img src="{!! $picture1 !!}" class="bars-img" alt="">
                        </div>
                    </div>
                    <p class="mb-0 fs-19"><i class='bx bxs-info-circle' ></i><span style="color: #B3261C;">IMPORTANT NOTE:</span> You should be at the boarding gate before 20:05 </p>

                    </div>
                  </div>
            </div>
            <div class="col-md-4 p-0">
                <div class="card" style="background: #F2F2F2;">
                    <div class="card-header flex-wrap align-items-center" style="    padding-bottom: 23px;">
                        <h5 class="heading-h5">...</h5>
                     <h5 class="heading-h6 mb-0">Boarding pass</h5>
                     <h5 class="heading-h5">...</h5>
                    </div>
                    <div class="card-body" style="padding: 0px;">
                      <div class="d-flex justify-content-between flex-wrap" style="padding: 15px;">

                            <div class="d-flex align-items-center gap-15">
                        <h5 class="passanger-heading fs-15"><i class='bx bx-id-card'></i> Passenger</h5>
                        <h5 class="heading-john w-200">{{@$vendor->service->passenger_name}}</h5>
                    </div>
                    <div class="d-flex align-items-center gap-15">
                        <h5 class="passanger-heading fs-15"><i class='bx bxs-plane-take-off'></i> From</h5>
                        <h5 class="heading-john w-200 ml-39">{{@$vendor->service->from_location	}}</h5>
                    </div>
                    <div class="d-flex align-items-center gap-15">
                        <h5 class="passanger-heading fs-15"><i class='bx bxs-plane-land'></i> TO</h5>
                        <h5 class="heading-john w-200 ml-48">{{@$vendor->service->to_location	}}</h5>
                    </div>
                </div>
                <img src="{!! $picture2 !!}" class="w-100" alt="">
                <img src="{!! $picture3 !!}" class="d-flex m-auto pt-1 pb-1" alt="">


                    </div>
                  </div>
            </div>
        </div>
        <div class="row mt-3 mb-3">
            <div class="col-md-8 p-0">
                <div class="card">
                    <div class="card-header flex-wrap" style="background: #BB221A;">
                     <img src="{!! $picture4 !!}" class="logo-img" alt="">
                     <h5 class="heading-h5">................................................</h5>

                    </div>
                    <div class="card-body"style="background: #BB221A; color: #fff; border-bottom-left-radius: 22px;border-bottom-right-radius: 22px;">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="border-left" style="border-left: 3px solid #fff !important;">
                                <h5 class="pl-2 fs-12">Boarding <br> Rules</h5>

                            </div>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis facere ut, quos delectus commodi in cumque velit dolore facilis harum.</p>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis.</p>
                            <p class="fs-12 mb-1" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa.</p>
                            </div>
                            <div class="col-md-4">
                                <div class="border-left" style="border-left: 3px solid #fff !important;">
                                <h5 class="pl-2 fs-12">Boarding <br> Rules</h5>

                            </div>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis facere ut, quos delectus commodi in cumque velit dolore facilis harum.</p>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis.</p>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa.</p>
                            </div>
                            <div class="col-md-4">
                                <div class="border-left" style="border-left: 3px solid #fff !important;">
                                <h5 class="pl-2 fs-12">Boarding <br> Rules</h5>
                            </div>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis facere ut, quos delectus commodi in cumque velit dolore facilis harum.</p>
                            <p class="fs-12 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est autem ipsa doloribus fugit! Aut, provident totam enim obcaecati perspiciatis.</p>
                            <img src="{!! $picture5 !!}" alt="">
                            </div>
                        </div>

                    </div>
                  </div>
            </div>
            <div class="col-md-4 p-0">
                <div class="card" style="background: #394B8B;">

                    <div class="card-body" style="padding: 0px;">
                      <div class="d-flex justify-content-between flex-column"style="padding: 15px;">

                            <div class="d-flex align-items-center gap-65 m-auto pt-5">
                        <h5 class="passanger-heading fs-30 text-white"> FLIGHT</h5>
                        <h5 class="fs-40 text-white">{{@$vendor->flight_number}}</h5>
                    </div>
                    <div class="d-flex align-items-center gap-65 m-auto">
                        <h5 class="passanger-heading fs-30 text-white"> GATE</h5>
                        <h5 class="fs-40 text-white">{{@$vendor->gate}}</h5>
                    </div>
                    <div class="d-flex align-items-center gap-65 m-auto">
                        <h5 class="passanger-heading fs-30 text-white">SEAT</h5>
                        <h5 class="fs-40 text-white">{{@$vendor->seat_number}}</h5>
                    </div>
                    <div class="d-flex align-items-center gap-65 m-auto">
                        <h5 class="passanger-heading fs-30 text-white">CLASS</h5>
                        <h5 class="fs-40 text-white">{{@$vendor->class}}</h5>
                    </div>
                    <img src="{!! $picture6 !!}" class="img-fluid pt-2" alt="">
                </div>



                    </div>
                  </div>
            </div>
        </div>
    </div>

</body>
</html>
