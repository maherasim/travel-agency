import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react'; // Add this import
import { useEffect } from 'react';


export default function ServiceForm({ auth, clients }) {

    const [formData, setFormData] = useState({
        service_type: '',
        passenger_number: '',
        passenger_names: [],
        domestic_international: '',
        oneway_roundway: '',
        from_location: '',
        start_date: '',
        to_location: '',
        cab_type: '',
        cab_price: '',
        time_slot: '',
        cab: '',
        total_passengers: '',
        time_hour: '',
        cab_city: '',
        cab_start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',

        room_occupancy: '',
        departure_date: '',
        return_date: '',
        airline_name: '',
        name: '',
        price: '', // Add price field
        city: '', // Add city field
        hotel_name: '', // Add hotel_name field
        check_in: '', // Add check_in field
        check_out: '', // Add check_out field
        night: '', // Add night field
        meal_plan: '', // Add meal_plan field
        hotel_category: '', // Add hotel_category field
        price_module: '', // Add price_module field
    });


    const { data, setData, post, processing, errors } = useForm(formData);

    useEffect(() => {
        // const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (window.location.href.includes('back')) {

            fetch(route('services.back'))
                .then(response => response.json())
                .then(function (r) {
                    // console.log(r.data) 
                    setData(r.data)
                })
            // setData(JSON.parse('{"service_type":"flight","passenger_number":"1","passenger_names":["ghjghj"],"domestic_international":"domestic","oneway_roundway":"oneway","from_location":"sadsad","to_location":"sadsad","departure_date":"2024-05-15","return_date":"","airline_name":"","name":"","trade_name":"Drew Boyle"}'));
        }
    }, []);

    useEffect(() => {
        if (data.check_in && data.check_out) {
            const checkInDate = new Date(data.check_in);
            const checkOutDate = new Date(data.check_out);
            const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
            const nightCount = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate nights
            setData('night', nightCount); // Update night count in formData
        }
    }, [data.check_in, data.check_out]); // Watch for changes in check-in and check-out dates

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedClient, setSelectedClient] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get values of required fields
        const tradeName = document.getElementById("trade_name").value;
        const serviceType = document.getElementById("service_type").value;
    
        // Check if required fields are filled
        if (tradeName && serviceType) {
            localStorage.getItem('formData', {
                ...data,
                passenger_names: data.passenger_names, // Include passenger names in the request payload
            });
    
            // Submit form data
            post(route('services.store'), {
                data: {
                    ...data,
                    passenger_names: data.passenger_names, // Include passenger names in the request payload
                },
                onSuccess: () => {
                    setShowSuccess(true);
                    setMessage('Service Request submitted successfully');
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 5000);
    
                    const checkInElement = document.getElementById("check_in");
                    const checkOutElement = document.getElementById("check_out");
                     // const checkIn = document.getElementById("check_in").value;
                    // const checkOut = document.getElementById("check_out").value;
                    const checkIn = checkInElement ? checkInElement.value : null;
                    const checkOut = checkOutElement ? checkOutElement.value : null;
                     const departureDateElement = document.getElementById("departure_date");
                    const departureDate = departureDateElement ? departureDateElement.value : null;

                    setSelectedClient(tradeName);
                    localStorage.setItem('selectedClient', tradeName);
                    localStorage.setItem('selectedService', serviceType);
                    if (checkIn !== null) {
                        localStorage.setItem('selectedCheckin', checkIn);
                    }
                    if (checkOut !== null) {
                        localStorage.setItem('selectedCheckout', checkOut);
                    }
                    if (departureDate !== null) {
                        localStorage.setItem('selectedDate', departureDate);
                    }
                    window.location.href = '/quotation/form/fetch';
                },
                onError: (errors) => {
                    setShowError(true);
                    console.log(errors);
                    setMessage('Unable to submit Service Request');
                    setTimeout(() => {
                        setShowError(false);
                    }, 5000);
                },
            });
        } else {
            // Display error message if required fields are not filled
            setShowError(true);
            setMessage('Please fill in all required fields (Client Name, Service Type)');
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Service Request Form" />
            {auth.user.role_id == 1 && (
                <nav style={{ marginBottom: '20px' }}>
                    <ul style={{ listStyle: 'none', paddingLeft: 120, margin: 0 }}>
                        <li style={{ display: 'inline', marginRight: '10px' }}>
                            <a href="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>Home</a> /
                        </li>
                        <li style={{ display: 'inline', marginRight: '10px' }}>
                            <a href="/services/form" style={{ textDecoration: 'none', color: 'black' }}>Services Form</a> /
                        </li>
                        <li style={{ display: 'inline', marginRight: '10px' }}>
                            <a href="/quotation/form/fetch" style={{ textDecoration: 'none', color: 'black' }}>Quotation Form</a>
                        </li>
                    </ul>
                </nav>)}
            {auth.user.role_id == 1 && (

                <div className="flex justify-center items-center space-x-4">

                    <div className="flex items-center bg-green-500 px-4 py-2 rounded-xl">
                        <span className="text-sm text-white font-semibold ">Step 1</span>
                    </div>

                    <div className="h-1 w-10 bg-green-500"></div>


                    <div className="flex items-center">
                        <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 2</span>
                    </div>
                    <div className="h-1 w-10 bg-green-500"></div>


                    <div className="flex items-center">
                        <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 3</span>
                    </div>
                    <div className="h-1 w-10 bg-green-500"></div>


                    <div className="flex items-center">
                        <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 4</span>
                    </div>

                </div>)}
            <div className=' text-vermilion-700 bg-white container w-md-80 rounded-md shadow-sm p-4  mt-4'>
                <form onSubmit={handleSubmit}>
                    {showSuccess && <div className="text-green-600">{message}</div>}
                    {showError && <div className="text-red-600">{message}</div>}

                    {auth.user.role_id == 1 && (

                        <div className="mt-4">
                            <label htmlFor="name" className="block font-medium text-sm">
                                Client Name
                            </label>
                            <select
                                id="trade_name"
                                name="trade_name"
                                value={data.trade_name}
                                onChange={(e) => setData('trade_name', e.target.value)}
                                className="mt-1 block w-full rounded-md bg-white text-black"
                                style={{ border: '2px solid pink' }}
                            >
                                <option value="">Select Client Name</option>
                                {clients
                                    .filter(client => client.trade_name !== '') // Filter out clients with name "Admin"
                                    .map((client) => (
                                        <option key={client.id} value={client.trade_name}>
                                            {client.trade_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>)}
                    <div className="mt-4">
                        <label htmlFor="service_type" className="block font-medium text-sm ">
                            Service Type
                        </label>
                        <select
                            id="service_type"
                            name="service_type"
                            value={data.service_type}
                            onChange={(e) => setData('service_type', e.target.value)}
                            className="mt-1 block w-full rounded-md bg-white text-black"
                            style={{ border: '2px solid pink' }}
                            required
                        >
                            <option value="">Select Service Type</option>
                            <option value="flight">Flight</option>
                            <option value="cab">Cab</option>
                            <option value="visa">Visa</option>
                            <option value="hotel">Hotel</option>
                        </select>
                        {errors.service_type && <div className="text-red-600">{errors.service_type}</div>}
                    </div>

                    {/* Additional fields for flight service */}
                    {data.service_type === 'flight' && (
                        <>
                            <div className="grid grid-cols-3 gap-4">

                                <div className="mt-4">
                                    <label htmlFor="passenger_number" className="block font-medium text-sm">
                                        Passenger   Number
                                    </label>
                                    <TextInput
                                        id="passenger_number"
                                        type="number"
                                        name="passenger_number"
                                        value={data.passenger_number}
                                        onChange={(e) => setData('passenger_number', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.passenger_number && <div className="text-red-600">{errors.passenger_number}</div>}
                                </div>

                                {parseInt(data.passenger_number) > 0 && (
                                    <div className="mt-4">
                                        <label htmlFor="passenger_names" className="block font-medium text-sm">
                                            Passenger Name(s)
                                        </label>
                                        {/* Render Passenger Name fields dynamically based on passenger number */}
                                        {Array.from({ length: parseInt(data.passenger_number) }).map((_, index) => (
                                            <TextInput
                                                key={index}
                                                id={`passenger_name_${index}`}
                                                type="text"
                                                name={`passenger_names[${index}]`}
                                                value={data.passenger_names[index] || ''}
                                                onChange={(e) => {
                                                    const newPassengerNames = [...data.passenger_names];
                                                    newPassengerNames[index] = e.target.value;
                                                    setData('passenger_names', newPassengerNames);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                placeholder={`Passenger ${index + 1} Name`}

                                            />
                                        ))}
                                        {errors.passenger_names && <div className="text-red-600">{errors.passenger_names}</div>}
                                    </div>
                                )}

                                <div className="mt-4">
                                    <label htmlFor="domestic_international" className="block font-medium text-sm ">
                                        Domestic/International
                                    </label>
                                    <select
                                        id="domestic_international"
                                        name="domestic_international"
                                        value={data.domestic_international}
                                        onChange={(e) => setData('domestic_international', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="domestic">Domestic</option>
                                        <option value="international">International</option>
                                    </select>
                                    {errors.domestic_international && <div className="text-red-600">{errors.domestic_international}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="oneway_roundway" className="block font-medium text-sm ">
                                        One Way/Roundway
                                    </label>
                                    <select
                                        id="oneway_roundway"
                                        name="oneway_roundway"
                                        value={data.oneway_roundway}
                                        onChange={(e) => setData('oneway_roundway', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="oneway">One Way</option>
                                        <option value="roundway">Roundway</option>
                                    </select>
                                    {errors.oneway_roundway && <div className="text-red-600">{errors.oneway_roundway}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">

                                <div className="mt-4">
                                    <label htmlFor="from_location" className="block font-medium text-sm">
                                        From (Location)
                                    </label>
                                    <TextInput
                                        id="from_location"
                                        type="text"
                                        name="from_location"
                                        value={data.from_location}
                                        onChange={(e) => setData('from_location', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.from_location && <div className="text-red-600">{errors.from_location}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="to_location" className="block font-medium text-sm">
                                        To (Location)
                                    </label>
                                    <TextInput
                                        id="to_location"
                                        type="text"
                                        name="to_location"
                                        value={data.to_location}
                                        onChange={(e) => setData('to_location', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.to_location && <div className="text-red-600">{errors.to_location}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="departure_date" className="block font-medium text-sm">
                                        Departure Date
                                    </label>
                                    <TextInput
                                        id="departure_date"
                                        type="date"
                                        name="departure_date"
                                        value={data.departure_date}
                                        onChange={(e) => setData('departure_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.departure_date && <div className="text-red-600">{errors.departure_date}</div>}
                                </div>
                            </div>
                            {/* Return date field */}
                            <div className="grid grid-cols-3 gap-4">

                                {data.oneway_roundway === 'roundway' && (
                                    <div className="mt-4">
                                        <label htmlFor="return_date" className="block font-medium text-sm">
                                            Return Date
                                        </label>
                                        <TextInput
                                            id="return_date"
                                            type="date"
                                            name="return_date"
                                            value={data.return_date}
                                            onChange={(e) => setData('return_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md bg-white text-black"
                                            style={{ border: '2px solid pink' }}
                                            required
                                        />
                                        {errors.return_date && <div className="text-red-600">{errors.return_date}</div>}
                                    </div>
                                )}

                            </div>

                        </>
                    )}

                    {data.service_type === 'hotel' && (
                        <>
                            <div className="grid grid-cols-3 gap-4">

                                <div className="mt-4">
                                    <label htmlFor="domestic_international" className="block font-medium text-sm">
                                        Domestic/International
                                    </label>
                                    <select
                                        id="domestic_international"
                                        name="domestic_international"
                                        value={data.domestic_international}
                                        onChange={(e) => setData('domestic_international', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="domestic">Domestic</option>
                                        <option value="international">International</option>
                                    </select>
                                    {errors.domestic_international && <div className="text-red-600">{errors.domestic_international}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="city" className="block font-medium text-sm">
                                        City
                                    </label>
                                    <TextInput
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.city && <div className="text-red-600">{errors.city}</div>}
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="hotel_name" className="block font-medium text-sm">
                                        Hotel Name
                                    </label>
                                    <TextInput
                                        id="hotel_name"
                                        type="text"
                                        name="hotel_name"
                                        value={data.hotel_name}
                                        onChange={(e) => setData('hotel_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}

                                    />
                                    {errors.hotel_name && <div className="text-red-600">{errors.city}</div>}
                                </div>




                            </div>
                            <div className="grid grid-cols-3 gap-4">

                                <div className="mt-4">
                                    <label htmlFor="check_in" className="block font-medium text-sm">
                                        Check In Date
                                    </label>
                                    <TextInput
                                        id="check_in"
                                        type="date"
                                        name="check_in"
                                        value={data.check_in}
                                        onChange={(e) => setData('check_in', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.check_in && <div className="text-red-600">{errors.check_in}</div>}
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="check_out" className="block font-medium text-sm">
                                        Check Out Date
                                    </label>
                                    <TextInput
                                        id="check_out"
                                        type="date"
                                        name="check_out"
                                        value={data.check_out}
                                        onChange={(e) => setData('check_out', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.check_out && <div className="text-red-600">{errors.check_out}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="night" className="block font-medium text-sm">
                                        No. of Nights
                                    </label>
                                    <TextInput
                                        id="night"
                                        type="number"
                                        name="night"
                                        value={data.night}
                                        onChange={(e) => setData('night', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    />
                                    {errors.night && <div className="text-red-600">{errors.night}</div>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="meal_plan" className="block font-medium text-sm">
                                        Meal Plan
                                    </label>
                                    <select
                                        id="meal_plan"
                                        name="meal_plan"
                                        value={data.meal_plan}
                                        onChange={(e) => setData('meal_plan', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="Only Room">Only Room</option>
                                        <option value="Room With Breakfast">Room With Breakfast</option>
                                        <option value="Room + Breakfast + Lunch Or Dinner"> Room + Breakfast + Lunch Or Dinner</option>
                                        <option value="Room + Breakfast + Lunch + Dinner"> Room + Breakfast + Lunch + Dinner</option>
                                    </select>
                                    {errors.meal_plan && <div className="text-red-600">{errors.meal_plan}</div>}
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="hotel_category" className="block font-medium text-sm">
                                        Hotel Category
                                    </label>
                                    <select
                                        id="hotel_category"
                                        name="hotel_category"
                                        value={data.hotel_category}
                                        onChange={(e) => setData('hotel_category', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="*">1 Star</option>
                                        <option value=" **">2 Star</option>
                                        <option value="***"> 3 Star</option>
                                        <option value="****"> 4 Star</option>
                                        <option value="*****"> 5 Star</option>
                                    </select>
                                    {errors.hotel_category && <div className="text-red-600">{errors.hotel_category}</div>}
                                </div>
 
                            </div>
                            <div className="mt-4">
                                <label htmlFor="room_occupancy" className="block font-medium text-sm">
                                    Room Occupancy
                                </label>
                                <select
                                    id="room_occupancy"
                                    name="room_occupancy"
                                    value={data.room_occupancy}
                                    onChange={(e) => setData('room_occupancy', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-white text-black"
                                    style={{ border: '2px solid pink' }}
                                    required
                                >
                                    <option value="">Select Option</option>
                                    <option value="single">single</option>
                                    <option value="Double">Double</option>
                                    <option value="Triple"> Triple</option>
                                    <option value="Quad"> Quad</option>
                                </select>
                                {errors.room_occupancy && <div className="text-red-600">{errors.room_occupancy}</div>}
                            </div>



                        </>
                    )}

                    {data.service_type === 'cab' && (
                        <>
                            <div className="mt-4">
                                <label htmlFor="cab" className="block font-medium text-sm ">
                                    Cab
                                </label>
                                <select
                                    id="cab"
                                    name="cab"
                                    value={data.cab}
                                    onChange={(e) => setData('cab', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-white text-black"
                                    style={{ border: '2px solid pink' }}
                                    required
                                >
                                    <option value="">Select Cab Type</option>
                                    <option value="local use">Local use</option>
                                    <option value="outstation">Outstation</option>
                                    <option value="package">Package</option>
                                </select>
                                {errors.cab && <div className="text-red-600">{errors.cab}</div>}
                            </div>






                            {data.cab === 'local use' && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">

                                        <div className="mt-4">
                                            <label htmlFor="time_slot" className="block font-medium text-sm ">
                                                Time Slot
                                            </label>
                                            <select
                                                id="time_slot"
                                                name="time_slot"
                                                value={data.time_slot}
                                                onChange={(e) => setData('time_slot', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            >
                                                <option value="">Select Time Slot</option>
                                                <option value="8 hour">8h 80km</option>
                                                <option value="12 hour">12h 120km</option>

                                            </select>
                                            {errors.time_slot && <div className="text-red-600">{errors.time_slot}</div>}
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="cab_price" className="block font-medium text-sm">
                                                Price
                                            </label>
                                            <TextInput
                                                id="cab_price"
                                                type="text"
                                                name="cab_price"
                                                value={data.cab_price}
                                                onChange={(e) => setData('cab_price', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.cab_price && <div className="text-red-600">{errors.cab_price}</div>}
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="cab_city" className="block font-medium text-sm">
                                                city
                                            </label>
                                            <TextInput
                                                id="cab_city"
                                                type="text"
                                                name="cab_city"
                                                value={data.cab_city}
                                                onChange={(e) => setData('cab_city', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.cab_city && <div className="text-red-600">{errors.cab_city}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">

                                        <div className="mt-4">
                                            <label htmlFor="cab_start_date" className="block font-medium text-sm">
                                                Trip Start Date
                                            </label>
                                            <TextInput
                                                id="cab_start_date"
                                                type="date"
                                                name="cab_start_date"
                                                value={data.cab_start_date}
                                                onChange={(e) => setData('cab_start_date', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.cab_start_date && <div className="text-red-600">{errors.cab_start_date}</div>}
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="start_time" className="block font-medium text-sm">
                                                Trip Start Time
                                            </label>
                                            <TextInput
                                                id="start_time"
                                                type="time"
                                                name="start_time"
                                                value={data.start_time}
                                                onChange={(e) => setData('start_time', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.start_time && <div className="text-red-600">{errors.start_time}</div>}
                                        </div>

                                        <div className="mt-4">
                                            <label htmlFor="end_date" className="block font-medium text-sm">
                                                Trip End Date
                                            </label>
                                            <TextInput
                                                id="end_date"
                                                type="date"
                                                name="end_date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.end_date && <div className="text-red-600">{errors.end_date}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">

                                        <div className="mt-4">
                                            <label htmlFor="end_time" className="block font-medium text-sm">
                                                Trip End Time
                                            </label>
                                            <TextInput
                                                id="end_time"
                                                type="time"
                                                name="end_time"
                                                value={data.end_time}
                                                onChange={(e) => setData('end_time', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.end_time && <div className="text-red-600">{errors.end_time}</div>}
                                        </div>

                                        <div className="mt-4">
                                            <label htmlFor="cab_type" className="block font-medium text-sm ">
                                                Cab Type
                                            </label>
                                            <select
                                                id="cab_type"
                                                name="cab_type"
                                                value={data.cab_type}
                                                onChange={(e) => setData('cab_type', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            >
                                                <option value="">Select Cab Type</option>
                                                <option value="Sedan">Sedan</option>
                                                <option value="SUV">SUV</option>

                                            </select>
                                            {errors.cab_type && <div className="text-red-600">{errors.cab_type}</div>}
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="total_passengers" className="block font-medium text-sm">
                                                Total Passengers
                                            </label>
                                            <TextInput
                                                id="total_passengers"
                                                type="number"
                                                name="total_passengers"
                                                value={data.total_passengers}
                                                onChange={(e) => setData('total_passengers', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: '2px solid pink' }}
                                                required
                                            />
                                            {errors.total_passengers && <div className="text-red-600">{errors.total_passengers}</div>}
                                        </div>

                                    </div>




                                </>



                            )}

                        </>
                    )}


                    <></>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4 bg-pink-600" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
