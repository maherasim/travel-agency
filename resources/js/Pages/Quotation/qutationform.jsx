import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState, useEffect } from "react";
import Modal from '@/Components/Modal'; // Assuming you have a Modal component
import SecondaryButton from '@/Components/SecondaryButton';
import FilledDataModal from './FilledDataModal'; // Adjust the path as necessary

export default function QuotationForm({ auth, clients, passengerName }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        clientName: localStorage.getItem("selectedClient") || "",
        serviceType: localStorage.getItem("selectedService") || "",
        departure_date: localStorage.getItem("selectedDate") || "",
        gstn: localStorage.getItem("selectedGstn") || "",
        check_in: localStorage.getItem("selectedCheckin") || "",
        check_out: localStorage.getItem("selectedCheckout") || "",
        prices: [],
        airline_names: [],
        id: auth.user.id,
        data: []
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [duplicateForms, setDuplicateForms] = useState([
        {
            airline_name: "",
            departure_time: "",
            arrival_time: "",
            ourcost: "",
            name: "",
            extra_km_price: "",
            extra_hour_price: "",
            base_price: "",
            room_no: "",
            departure_date: localStorage.getItem("selectedDate") || "",
            flight_number: "",
            flight_gate: "",
            fare_type: "",
            prf: "",
            gstn: localStorage.getItem("selectedGstn") || "",
            room_category: [],
            total_cost: "",
            flight_class: "",
            pnr_number: "",
            seat_number: "",
            guest_name: "",
            hotel_address: "",
            contact_no: "",
            confirmation_no: "",
            check_in: localStorage.getItem("selectedCheckin") || "",
            check_out: localStorage.getItem("selectedCheckout") || "",
        },
    ]);

    const [roomCategories, setRoomCategories] = useState([]);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showFilledDataModal, setShowFilledDataModal] = useState(false);
    const [filledData, setFilledData] = useState([]);

    const duplicateFields = () => {
        setDuplicateForms((prevForms) => [
            ...prevForms,
            {
                airline_name: "",
                departure_time: "",
                arrival_time: "",
                ourcost: "",
                name: "",
                departure_date: localStorage.getItem("selectedDate") || "",
                flight_number: "",
                flight_gate: "",
                fare_type: "",
                prf: "",
                extra_km_price: "",
                extra_hour_price: "",
                base_price: "",
                gstn: localStorage.getItem("selectedGstn") || "",
                room_no: "",
                room_category: [],
                total_cost: "",
                flight_class: "",
                pnr_number: "",
                seat_number: "",
                guest_name: "",
                hotel_address: "",
                contact_no: "",
                confirmation_no: "",
                check_in: localStorage.getItem("selectedCheckin") || "",
                check_out: localStorage.getItem("selectedCheckout") || "",
            }
        ]);
    };

    const removeDuplicateFields = () => {
        if (duplicateForms.length > 1) {
            setDuplicateForms((prevForms) => prevForms.slice(0, -1));
        }
    };

    useEffect(() => {
        const noOfRooms = parseInt(localStorage.getItem("no_of_rooms"), 10) || 1;
        setRoomCategories(Array.from({ length: noOfRooms }, () => ""));
    }, []);

    useEffect(() => {
        duplicateForms.forEach((formData, index) => {
            const ourcost = parseFloat(formData.ourcost) || 0;
            const prf = parseFloat(formData.prf) || 0;
            const totalCost = (ourcost + prf).toFixed(2);
            setDuplicateForms((prevForms) => {
                const updatedForms = [...prevForms];
                updatedForms[index] = {
                    ...updatedForms[index],
                    total_cost: totalCost,
                };
                return updatedForms;
            });
        });
    }, [duplicateForms]);

    const openConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const confirmSubmission = () => {
        setShowConfirmationModal(false);
        submitForm();
    };

    const submitForm = async () => {
        const prices = duplicateForms.map((formData) => formData.ourcost);
        const airlineNames = duplicateForms.map((formData) => formData.airline_name);

        const formData = {
            clientName: localStorage.getItem("selectedClient"),
            serviceType: localStorage.getItem("selectedService"),
            departure_date: localStorage.getItem("selectedDate"),
            prices: prices,
            airline_names: airlineNames,
            id: auth.user.id,
            data: duplicateForms.map(
                ({
                    airline_name,
                    departure_time,
                    arrival_time,
                    ourcost,
                    departure_date,
                    name,
                    flight_number,
                    fare_type,
                    prf,
                    extra_km_price,
                    extra_hour_price,
                    base_price,
                    gstn,
                    room_no,
                    total_cost,
                    seat_number,
                    flight_gate,
                    flight_class,
                    pnr_number,
                    guest_name,
                    room_category,
                    hotel_address,
                    contact_no,
                    confirmation_no,
                    check_in,
                    check_out
                }) => ({
                    airline_name,
                    departure_time,
                    arrival_time,
                    ourcost,
                    guest_name,
                    departure_date,
                    name,
                    extra_km_price,
                    extra_hour_price,
                    base_price,
                    flight_number,
                    fare_type,
                    prf,
                    total_cost,
                    seat_number,
                    flight_gate,
                    flight_class,
                    gstn,
                    pnr_number,
                    room_category, // Store room categories as an array
                    hotel_address,
                    contact_no,
                    room_no,
                    confirmation_no,
                    check_in,
                    check_out
                })
            ),
        };

        fetch("/api/quotationStoreApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                if (data && data.success === true) {
                    setFilledData(formData.data.map(getFilledFields));
                    setShowFilledDataModal(true); // Show filled data modal
                } else {
                    throw new Error("API response indicates failure.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleTimeChange = (index, type, value) => {
        const updatedForms = [...duplicateForms];
        updatedForms[index][type] = value;
        setDuplicateForms(updatedForms);

        const { departure_time, arrival_time } = updatedForms[index];

        if ((type === 'departure_time' || type === 'arrival_time') && departure_time && arrival_time) {
            if (departure_time >= arrival_time) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [index]: 'Arrival time must be later than departure time',
                }));
            } else {
                setValidationErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[index];
                    return newErrors;
                });
            }
        }
    };

    const handleRoomCategoryChange = (index, roomIndex, value) => {
        const updatedForms = [...duplicateForms];
        if (!updatedForms[index].room_category) {
            updatedForms[index].room_category = [];
        }
        updatedForms[index].room_category[roomIndex] = value;
        setDuplicateForms(updatedForms);
    };

    const copyToClipboard = () => {
        const formDataText = JSON.stringify(filledData, null, 2);
        navigator.clipboard.writeText(formDataText)
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error('Failed to copy!', err);
            });
    };

    const getFilledFields = (formData) => {
        return Object.keys(formData).reduce((acc, key) => {
            if (formData[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Quotation" />

            <nav style={{ marginBottom: "20px" }}>
                <ul style={{ listStyle: "none", paddingLeft: 120, margin: 0 }}>
                    <li style={{ display: "inline", marginRight: "10px" }}>
                        <a
                            href="/dashboard"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            Home
                        </a>{" "}
                        /
                    </li>

                    <li style={{ display: "inline", marginRight: "10px" }}>
                        <a
                            href="/quotation/form/fetch"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            Quotation Form
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-center items-center space-x-4">
                {/* Step 1 */}

                <div className="flex items-center ">
                    <span className="text-sm font-semibold flex gap-2 items-center bg-green-500 text-white px-4 py-2 rounded-xl ">
                        <span>Step 1 </span>
                        <svg
                            width="18px"
                            height="18px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </span>
                </div>

                <div className="h-1 w-10 bg-green-500"></div>

                {/* Step 2 */}
                <div className="flex items-center bg-green-500 border-2 px-4 py-2 rounded-xl">
                    <span className="text-sm font-semibold  text-white">
                        Step 2
                    </span>
                </div>
                <div className="h-1 w-10 bg-green-500"></div>

                <div className="flex items-center">
                    <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 3</span>
                </div>
                <div className="h-1 w-10 bg-green-500"></div>

                <div className="flex items-center">
                    <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 4</span>
                </div>
            </div>
            <div className="text-vermilion-700 bg-white container w-md-80 rounded-md shadow-sm p-4 mt-4">
                <form onSubmit={(e) => e.preventDefault()}>
                    {showSuccess && (
                        <div className="text-green-600">{message}</div>
                    )}
                    {showError && <div className="text-red-600">{message}</div>}
                    {duplicateForms.map((formData, index) => (
                        <div key={index}>
                            {localStorage.getItem("selectedService") === "flight" && (
                                <div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`airline_name_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Airline Name
                                            </label>
                                            <select
                                                id={`airline_name_${index}`}
                                                name={`airline_name_${index}`}
                                                value={formData.airline_name}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].airline_name =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            >
                                                <option value="">Select Airline</option>
                                                <option value="Indigo">Indigo</option>
                                                <option value="Airindia">
                                                    Airindia
                                                </option>
                                                <option value="AirAsia">AirAsia</option>
                                                <option value="Vistara">Vistara</option>
                                                <option value="Air India Express">
                                                    Air India Express
                                                </option>
                                                <option value="Spicejet">
                                                    Spicejet
                                                </option>
                                                <option value="Akasa Air">
                                                    Akasa Air
                                                </option>
                                                <option value="Etihad Airways">
                                                    Etihad Airways
                                                </option>
                                                <option value="Emirates">
                                                    Emirates
                                                </option>
                                                <option value="Qatar Airways">
                                                    Qatar Airways
                                                </option>
                                                <option value="Lufthansa">
                                                    Lufthansa
                                                </option>
                                                <option value="British Airways">
                                                    British Airways
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`flight_number_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Flight Number
                                            </label>
                                            <TextInput
                                                id={`flight_number_${index}`}
                                                type="text"
                                                name={`flight_number_${index}`}
                                                value={formData.flight_number}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].flight_number =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`gstn_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                GSTN Number
                                            </label>
                                            <TextInput
                                                id={`gstn_${index}`}
                                                type="text"
                                                name={`gstn_${index}`}
                                                value={formData.gstn}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].gstn =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`fare_type_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Fare Type
                                            </label>
                                            <select
                                                id={`fare_type_${index}`}
                                                name={`fare_type_${index}`}
                                                value={formData.fare_type}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].fare_type =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            >
                                                <option value="">Select Option</option>
                                                <option value="domestic">Normal</option>
                                                <option value="international">
                                                    SME Fare
                                                </option>
                                                <option value="international">
                                                    Special Fare
                                                </option>
                                                <option value="international">
                                                    Corporate Fare
                                                </option>
                                                <option value="international">
                                                    Other
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`departure_time_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Departure Time
                                            </label>
                                            <TextInput
                                                id={`departure_time_${index}`}
                                                type="time"
                                                name={`departure_time_${index}`}
                                                value={formData.departure_time}
                                                onChange={(e) => handleTimeChange(index, 'departure_time', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                        

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`arrival_time_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Arrival Time
                                            </label>
                                            <TextInput
                                                id={`arrival_time_${index}`}
                                                type="time"
                                                name={`arrival_time_${index}`}
                                                value={formData.arrival_time}
                                                onChange={(e) => handleTimeChange(index, 'arrival_time', e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                            {validationErrors[index] && (
                                                <div className="text-red-600 mt-2">
                                                    {validationErrors[index]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`ourcost_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Our Cost
                                            </label>
                                            <TextInput
                                                id={`ourcost_${index}`}
                                                type="number"
                                                name={`ourcost_${index}`}
                                                value={formData.ourcost}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].ourcost =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`prf_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                PRF
                                            </label>
                                            <TextInput
                                                id={`prf_${index}`}
                                                type="number"
                                                name={`prf_${index}`}
                                                value={formData.prf}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].prf =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`total_cost_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Total Cost
                                            </label>
                                            <TextInput
                                                id={`total_cost_${index}`}
                                                type="number"
                                                name={`total_cost_${index}`}
                                                value={formData.total_cost}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].total_cost =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {localStorage.getItem("selectedService") === "hotel" && (
                                <div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`guest_name_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Hotel  Name
                                            </label>
                                            <TextInput
                                                id={`guest_name_${index}`}
                                                type="text"
                                                name={`guest_name_${index}`}
                                                value={formData.guest_name}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].guest_name =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`gstn_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                GSTN Number
                                            </label>
                                            <TextInput
                                                id={`gstn_${index}`}
                                                type="text"
                                                name={`gstn_${index}`}
                                                value={formData.gstn}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].gstn =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                          <div className="mt-4">
                                            <label
                                                htmlFor={`hotel_address_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Hotel Address
                                            </label>
                                            <TextInput
                                                id={`hotel_address_${index}`}
                                                type="text"
                                                name={`hotel_address_${index}`}
                                                value={formData.hotel_address}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].hotel_address =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                        {roomCategories.map((roomCategory, roomIndex) => (
                                            <div className="mt-4" key={roomIndex}>
                                                <label
                                                    htmlFor={`room_category_${index}_${roomIndex}`}
                                                    className="block font-medium text-sm"
                                                >
                                                    Room Category {roomIndex + 1}
                                                </label>
                                                <TextInput
                                                    id={`room_category_${index}_${roomIndex}`}
                                                    type="text"
                                                    name={`room_category_${index}_${roomIndex}`}
                                                    value={formData.room_category[roomIndex] || ""}
                                                    onChange={(e) => handleRoomCategoryChange(index, roomIndex, e.target.value)}
                                                    className="mt-1 block w-full rounded-md bg-white text-black"
                                                    style={{ border: "2px solid pink" }}
                                                    required
                                                />
                                            </div>
                                        ))}
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`check_in_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                               Check In Date
                                            </label>
                                            <TextInput
                                                id={`check_in_${index}`}
                                                type="date"
                                                name={`check_in_${index}`}
                                                value={formData.check_in}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].check_in =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`check_out_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                               Check Out Date
                                            </label>
                                            <TextInput
                                                id={`check_out_${index}`}
                                                type="date"
                                                name={`check_out_${index}`}
                                                value={formData.check_out}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].check_out =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`ourcost_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Our Cost
                                            </label>
                                            <TextInput
                                                id={`ourcost_${index}`}
                                                type="number"
                                                name={`ourcost_${index}`}
                                                value={formData.ourcost}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].ourcost =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`prf_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                PRF
                                            </label>
                                            <TextInput
                                                id={`prf_${index}`}
                                                type="number"
                                                name={`prf_${index}`}
                                                value={formData.prf}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].prf =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor={`total_cost_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                                Total Cost
                                            </label>
                                            <TextInput
                                                id={`total_cost_${index}`}
                                                type="number"
                                                name={`total_cost_${index}`}
                                                value={formData.total_cost}
                                                onChange={(e) => {
                                                    const updatedForms = [
                                                        ...duplicateForms,
                                                    ];
                                                    updatedForms[index].total_cost =
                                                        e.target.value;
                                                    setDuplicateForms(updatedForms);
                                                }}
                                                className="mt-1 block w-full rounded-md bg-white text-black"
                                                style={{ border: "2px solid pink" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {localStorage.getItem("selectedService") === "cab" && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`base_price_${index}`}
                                                className="block font-medium text-sm"
                                            >
                                               Base Price
                                            </label>
                                            
                                            <TextInput
                                            id={`base_price_${index}`}
                                            type="number"
                                            name={`base_price_${index}`}
                                            value={formData.base_price}
                                            onChange={(e) => {
                                                const updatedForms = [
                                                    ...duplicateForms,
                                                ];
                                                updatedForms
                                                updatedForms[index].base_price =
                                                e.target.value;
                                            setDuplicateForms(updatedForms);
                                        }}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: "2px solid pink" }}
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor={`extra_hour_price_${index}`}
                                        className="block font-medium text-sm"
                                    >
                                      Extra Hours Price (per hr)
                                    </label>
                                    <TextInput
                                        id={`extra_hour_price_${index}`}
                                        type="number"
                                        name={`extra_hour_price_${index}`}
                                        value={formData.extra_hour_price}
                                        onChange={(e) => {
                                            const updatedForms = [
                                                ...duplicateForms,
                                            ];
                                            updatedForms[index].extra_hour_price =
                                                e.target.value;
                                            setDuplicateForms(updatedForms);
                                        }}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: "2px solid pink" }}
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor={`extra_km_price_${index}`}
                                        className="block font-medium text-sm"
                                    >
                                      Extra KM Price (per km)
                                    </label>
                                    <TextInput
                                        id={`extra_km_price_${index}`}
                                        type="number"
                                        name={`extra_km_price_${index}`}
                                        value={formData.extra_km_price}
                                        onChange={(e) => {
                                            const updatedForms = [
                                                ...duplicateForms,
                                            ];
                                            updatedForms[index].extra_km_price =
                                                e.target.value;
                                            setDuplicateForms(updatedForms);
                                        }}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: "2px solid pink" }}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
            <div className="flex items-center justify-between mt-4">
                <button type="button" onClick={duplicateFields} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Duplicate
                </button>
            </div>
            <div className="flex items-center justify-end mt-4">
                <PrimaryButton
                    onClick={() => {
                        window.location.href = "/services/form?back=1";
                    }}
                    className="ms-4 bg-pink-600"
                    disabled={processing}
                >
                    Back
                </PrimaryButton>

                <PrimaryButton
                    onClick={openConfirmationModal} // Open the confirmation modal
                    className="ms-4 bg-pink-600"
                    disabled={processing}
                >
                    Save
                </PrimaryButton>
            </div>
        </form>
    </div>
    <Modal show={showConfirmationModal} onClose={closeConfirmationModal}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Submission</h2>
            <p>Are you sure you want to submit the form?</p>
            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeConfirmationModal}>Cancel</SecondaryButton>
                <PrimaryButton onClick={confirmSubmission}>Confirm</PrimaryButton>
            </div>
        </div>
    </Modal>
    <FilledDataModal
        show={showFilledDataModal}
        onClose={() => setShowFilledDataModal(false)}
        filledData={filledData}
        copyToClipboard={copyToClipboard}
    />
</AuthenticatedLayout>
);
}
