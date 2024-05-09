import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput"; // Import the TextInput component

export default function ServiceForm({ auth, vendor }) {
    const [formDataArray, setFormDataArray] = useState([
        {
            airline_name: vendor?.airline_name,
            price: vendor?.price,
            passenger_number: vendor?.passenger_number || 0,
            passenger_names: Array.from({ length: vendor?.passenger_number || 0 }, () => ''),
        },
    ]);

    const { data, setData, post } = useForm({
        from_location: vendor.from_location,
        service_type: vendor.service_type,
        to_location: vendor.to_location,
        passenger_names: vendor.passenger_names,
        passenger_number: vendor.passenger_number,
        domestic_international: vendor.domestic_international,
        oneway_roundway: vendor.oneway_roundway,
        departure_date: vendor.departure_date,
        price: formDataArray[0].price, // Use the price from the first element of formDataArray
        airline_name: formDataArray[0].airline_name, // Use the airline_name from the first element of formDataArray
        id: vendor.id,
    });
    const submit = (e) => {
        e.preventDefault();

        // Construct arrays for prices and airline names from formDataArray
        const prices = formDataArray.map(formData => formData.price);
        const airlineNames = formDataArray.map(formData => formData.airline_name);

        // Construct formData object
        const formData = {
            prices: prices, // Make sure prices is always an array
            airline_names: airlineNames, // Make sure airline_names is always an array
            id: data.id,
            email: data.email,
            service_type: data.service_type,
            to_location: data.to_location,
            passenger_number: data.passenger_number,
            domestic_international: data.domestic_international,
            oneway_roundway: data.oneway_roundway,
            departure_date: data.departure_date,
        };

        // Send formData to the backend
        post(route('vendor.update'), formData);
    };



    const handleAddForm = () => {
        const lastFormData = formDataArray[formDataArray.length - 1];
        const newDataArray = [...formDataArray, { ...lastFormData }];
        setFormDataArray(newDataArray);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Service Request Form" />


            <div className="text-vermilion-700 bg-white container w-md-80 rounded-md shadow-sm p-4 mt-4">
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="mt-4">
                            <label
                                htmlFor={`service_type`}
                                className="block font-medium text-sm"
                            >
                                Service Type
                            </label>
                            <TextInput
                                id={`service_type`}
                                name={`service_type`}
                                value={data.service_type} // Use value from useForm
                                onChange={(e) => setData('service_type', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                                isFocused
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor={`from_location`}
                                className="block font-medium text-sm"
                            >
                                From (Location)
                            </label>
                            <TextInput
                                id={`from_location`}
                                type="text"
                                name={`from_location`}
                                value={data.from_location}
                                // onChange={(e) => {
                                //     handleServiceTypeChange
                                // }}
                                onChange={(e) => setData('from_location', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />
                        </div>

                        {/* To (Location) */}
                        <div className="mt-4">
                            <label
                                htmlFor={`to_location`}
                                className="block font-medium text-sm"
                            >
                                To (Location)
                            </label>
                            <TextInput
                                id={`to_location`}
                                type="text"
                                name={`to_location`}
                                value={data.to_location}
                                onChange={(e) => setData('to_location', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">

                        <div className="mt-4">
                            <label
                                htmlFor={`passenger_number`}
                                className="block font-medium text-sm"
                            >
                                Passenger Number
                            </label>
                            <TextInput
                                id={`passenger_number`}
                                type="number"
                                name={`passenger_number`}
                                value={formDataArray[0].passenger_number}
                                onChange={(e) => {
                                    const updatedFormDataArray = [...formDataArray];
                                    const newPassengerNumber = parseInt(e.target.value);
                                    updatedFormDataArray[0].passenger_number = newPassengerNumber;

                                    // If there are existing passenger names, preserve them
                                    if (updatedFormDataArray[0].passenger_names.length > 0) {
                                        const existingPassengerNames = updatedFormDataArray[0].passenger_names;
                                        updatedFormDataArray[0].passenger_names = Array.from({ length: newPassengerNumber }, (_, index) =>
                                            index < existingPassengerNames.length ? existingPassengerNames[index] : ''
                                        );
                                    } else {
                                        // Otherwise, create a new array of empty strings
                                        updatedFormDataArray[0].passenger_names = Array.from({ length: newPassengerNumber }, () => '');
                                    }

                                    setFormDataArray(updatedFormDataArray);
                                }}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />


                        </div>

                        {formDataArray[0].passenger_number > 0 && (
                            <div className="mt-4">
                                <label
                                    htmlFor={`passenger_names`}
                                    className="block font-medium text-sm"
                                >
                                    Passenger Name(s)
                                </label>
                                {formDataArray[0].passenger_names.map((passengerName, passengerIndex) => (
                                    <TextInput
                                        key={passengerIndex}
                                        id={`passenger_name_${passengerIndex}`}
                                        type="text"
                                        name={`passenger_names[${passengerIndex}]`}
                                        value={passengerName}
                                        onChange={(e) => {
                                            const updatedFormDataArray = [...formDataArray];
                                            updatedFormDataArray[0].passenger_names[passengerIndex] = e.target.value;
                                            setFormDataArray(updatedFormDataArray);
                                        }}
                                        className="mt-1 block w-full text-black"
                                        style={{ border: '2px solid pink' }}
                                        placeholder={`Passenger ${passengerIndex + 1} Name`}
                                         
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">

                        <div className="mt-4">
                            <label
                                htmlFor={`domestic_international`}
                                className="block font-medium text-sm"
                            >
                                Domestic/International
                            </label>
                            <TextInput
                                id={`domestic_international`}
                                name={`domestic_international`}
                                value={data.domestic_international}
                                onChange={(e) => setData('domestic_international', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />
                        </div>

                        {/* One Way/Roundway */}
                        <div className="mt-4">
                            <label
                                htmlFor={`oneway_roundway`}
                                className="block font-medium text-sm"
                            >
                                One Way/Roundway
                            </label>
                            <TextInput
                                id={`oneway_roundway`}
                                name={`oneway_roundway`}
                                value={data.oneway_roundway}
                                onChange={(e) => setData('oneway_roundway', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />
                        </div>

                        {/* Departure Date */}
                        <div className="mt-4">
                            <label
                                htmlFor={`departure_date`}
                                className="block font-medium text-sm"
                            >
                                Departure Date
                            </label>
                            <TextInput
                                id={`departure_date`}
                                type="date"
                                name={`departure_date`}
                                value={data.departure_date}
                                onChange={(e) => setData('departure_date', e.target.value)}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                required
                            />
                        </div>
                    </div>
 
                   
                    {/* Save button */}
                    <PrimaryButton
                        className="ms-4"
                        onClick={() => {
                            const formData = formDataArray.map(({ airline_name, price }) => ({ airline_name, price }));
                            post(route('vendor.update'), formData);
                            window.location.href = '/quotation/form/fetch';
                        }}
                    >
                        Save
                    </PrimaryButton>


                    {/* Add more forms button */}

                </form>
                {/* <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" onClick={handleAddForm}>
                        Duplicate
                    </PrimaryButton>
                </div> */}
            </div>

        </AuthenticatedLayout>
    );
}
