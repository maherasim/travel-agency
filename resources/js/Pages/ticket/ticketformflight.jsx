import { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabelRequire from '@/Components/InputLabelRequire';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AlertMessage from '@/Components/AlertMessage';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Register({ auth, passengerName }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        passenger_name: "",
        pnr_number: "",
        seat_number: "",
        flight: "",
        meal_included: false,
        flight_class: "",
        clientName: "",
        client_id: "",
        gender:"",
        booking_id: "",
        booking_pnr: "",
        booking_date: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const selectedClient = localStorage.getItem("selectedClient");
        const selectedClientId = localStorage.getItem("selectedClientId");
        
        setData((prevData) => ({
            ...prevData,
            clientName: selectedClient || prevData.clientName,
            client_id: selectedClientId || prevData.client_id,
            passenger_name: passengerName || prevData.passenger_name,
        }));
    }, [passengerName]);

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
                filledForms[data.client_id] = true;
                localStorage.setItem('filledForms', JSON.stringify(filledForms));

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
                            <InputLabelRequire htmlFor="passenger_name" value="Passenger Name" />
                            <TextInput
                                id="passenger_name"
                                name="passenger_name"
                                value={data.passenger_name}
                                className="mt-1 block w-full rounded-md bg-white text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('passenger_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.passenger_name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                                    <label htmlFor="gender" className="block font-medium text-sm ">
                                       Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>                                   
                                        <option value="infant">Infant</option>
                                    </select>
                                    {errors.gender && <div className="text-red-600">{errors.gender}</div>}
                                </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="pnr_number" value="PNR NUMBER" />
                            <TextInput
                                id="pnr_number"
                                name="pnr_number"
                                value={data.pnr_number}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('pnr_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.pnr_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="seat_number" value="Seat Number" />
                            <TextInput
                                id="seat_number"
                                type="seat_number"
                                name="seat_number"
                                value={data.seat_number}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('seat_number', e.target.value)}
                                required
                            />
                            <div className="flex items-center mt-2">
                                <input
                                    id="meal_included"
                                    type="checkbox"
                                    name="meal_included"
                                    checked={data.meal_included}
                                    onChange={(e) => setData('meal_included', e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="meal_included" className="text-sm">Meal Included</label>
                            </div>
                            <InputError message={errors.seat_number} className="mt-2" />
                        </div>
                        {/* <div className="mt-4">
                            <InputLabelRequire htmlFor="flight" value="Flight Number" />
                            <TextInput
                                id="flight"
                                type="flight"
                                name="flight"
                                value={data.flight}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('flight', e.target.value)}
                                required
                            />
                            <InputError message={errors.flight} className="mt-2" />
                        </div> */}
                 <div className="mt-4">
                                    <label htmlFor="flight_class" className="block font-medium text-sm ">
                                       Class
                                    </label>
                                    <select
                                        id="flight_class"
                                        name="flight_class"
                                        value={data.flight_class}
                                        onChange={(e) => setData('flight_class', e.target.value)}
                                        className="mt-1 block w-full rounded-md bg-white text-black"
                                        style={{ border: '2px solid pink' }}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        <option value="ecomony">Economy</option>
                                        <option value="buisenss">Business</option>                                   
                                         
                                    </select>
                                    {errors.flight_class && <div className="text-red-600">{errors.flight_class}</div>}
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
