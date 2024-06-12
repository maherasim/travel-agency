import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabelRequire from '@/Components/InputLabelRequire';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import AlertMessage from '@/Components/AlertMessage';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Register({ auth }) {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    };

    // Function to generate a new booking ID
    const generateBookingId = () => {
        const prefix = "TXC";
        let currentNumber = localStorage.getItem("currentBookingNumber");

        if (currentNumber == null) {
            currentNumber = 1001; // Start from 1001 if no value is stored
        } else {
            currentNumber = parseInt(currentNumber) + 1; // Increment the current number
        }

        localStorage.setItem("currentBookingNumber", currentNumber); // Store the new number

        return `${prefix}${currentNumber}`;
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        clientName: "",
        booking_id: generateBookingId(),
        booking_pnr: "",
        confirmation_number: "",
        contact_no: "",
        room_no:"",
        guest_name:"",
        arrival_time:"",
        departure_time:"",
        voucher: "",
        email:"",
        booking_date: getCurrentDate(),
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const selectedClient = localStorage.getItem("selectedClient");
        if (selectedClient) setData('clientName', selectedClient);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        setIsModalVisible(true);
    };

    const confirmSubmit = async () => {
        post(route('ticket.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Ticket registered successfully');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);

                // Mark the form as filled in local storage
                const filledForms = JSON.parse(localStorage.getItem('filledForms')) || {};
                filledForms[data.booking_id] = true;
                localStorage.setItem('filledForms', JSON.stringify(filledForms));

                // Clear local storage and redirect to the next URL after successful submission
                visit(route('invoice.index'));
            },
            onError: (errors) => {
                setShowError(true);
                setMessage('Unable to register ticket');
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            },
        });
        setIsModalVisible(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Ticket " />
            <div className="flex justify-center items-center space-x-4">
                {/* Step indicators */}
                <div className="flex items-center">
                    <span className="text-sm font-semibold flex gap-2 items-center bg-green-500 text-white px-4 py-2 rounded-xl">
                        <span>Step 1</span>
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
                <div className="flex items-center bg-green-500 border-2 px-4 py-2 rounded-xl">
                    <span className="text-sm font-semibold text-white">Step 2</span>
                </div>
                <div className="h-1 w-10 bg-green-500"></div>
                <div className="flex items-center bg-green-500 border-2 px-4 py-2 rounded-xl">
                    <span className="text-sm font-semibold text-white">Step 3</span>
                </div>
                <div className="h-1 w-10 bg-green-500"></div>
                <div className="flex items-center">
                    <span className="text-sm font-semibold ml-2 bg-gray-400 text-white px-4 py-2 rounded-xl">Step 4</span>
                </div>
            </div>
            <div className='text-vermilion-700 bg-white container w-md-80 rounded-md shadow-sm p-4 mt-4'>
                <form onSubmit={submit}>
                    {showSuccess && <AlertMessage type="success" message={message} />}
                    {showError && <AlertMessage type="error" message={message} />}

                    <div className="grid grid-cols-3 gap-4">
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="booking_id" value="Booking ID" />
                            <TextInput
                                id="booking_id"
                                type="text"
                                name="booking_id"
                                value={data.booking_id}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('booking_id', e.target.value)}
                                required
                                readOnly
                            />
                            <InputError message={errors.booking_id} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="name" className="block font-medium text-sm">
                                Guest Name
                            </label>
                            <TextInput
                                id="guest_name"
                                type="text"
                                name="guest_name"
                                value={data.guest_name}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('guest_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.guest_name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="booking_date" value="Booking Date" />
                            <TextInput
                                id="booking_date"
                                type="date"
                                name="booking_date"
                                value={data.booking_date}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('booking_date', e.target.value)}
                                required
                            />
                            <InputError message={errors.booking_date} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirmation_name" className="block font-medium text-sm">
                                Confirmation No
                            </label>
                            <TextInput
                                id="confirmation_number"
                                type="text"
                                name="confirmation_number"
                                value={data.confirmation_number}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('confirmation_number', e.target.value)}
                            />
                            <InputError message={errors.confirmation_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="contact_no" value="Contact Number" />
                            <TextInput
                                id="contact_no"
                                type="number"
                                name="contact_no"
                                value={data.contact_no}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('contact_no', e.target.value)}
                                required
                            />
                            <InputError message={errors.contact_no} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block font-medium text-sm">
                               Hotel Email
                            </label>
                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="room_no" className="block font-medium text-sm">
                                Room No
                            </label>
                            <TextInput
                                id="room_no"
                                type="text"
                                name="room_no"
                                value={data.room_no}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('room_no', e.target.value)}
                            />
                            <InputError message={errors.room_no} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="arrival_time" className="block font-medium text-sm">
                               Arrival Time
                            </label>
                            <TextInput
                                id="arrival_time"
                                type="time"
                                name="arrival_time"
                                value={data.arrival_time}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('arrival_time', e.target.value)}
                                required
                            />
                            <InputError message={errors.arrival_time} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="departure_time" className="block font-medium text-sm">
                               Departure Time
                            </label>
                            <TextInput
                                id="departure_time"
                                type="time"
                                name="departure_time"
                                value={data.departure_time}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('departure_time', e.target.value)}
                                required
                            />
                            <InputError message={errors.departure_time} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            
            <Modal show={isModalVisible} onClose={closeModal}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-auto max-h-96 mx-auto">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm Submission
                    </h2>
                    <h3 className="mt-4 text-gray-600">
                        Are you sure you want to register this ticket?
                    </h3>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton className="ml-3" onClick={confirmSubmit}>
                            OK
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    );
}
