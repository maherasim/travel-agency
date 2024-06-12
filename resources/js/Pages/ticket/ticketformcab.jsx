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
        
        clientName: "",
        client_id: "",
        drive_no:"",
        cab_number:"",
        cab_date:"",
        time:"",
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
            gate: passengerName || prevData.gate,
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
                                    <label htmlFor="drive_no" className="block font-medium text-sm ">
                                      Driver No.
                                    </label>
                                    <TextInput
                                    id="drive_no"
                                    name="number"
                                    value={data.drive_no}
                                    className="mt-1 block w-full rounded-md text-black bg-white"
                                    style={{ border: '2px solid pink' }}
                                    autoComplete="organization"
                                    onChange={(e) => setData('drive_no', e.target.value)}
                                    required
                                />
                                    {errors.gender && <div className="text-red-600">{errors.gender}</div>}
                                </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="cab_number" value="Cab NUMBER" />
                            <TextInput
                                id="cab_number"
                                name="cab_number"
                                value={data.cab_number}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('cab_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.cab_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="cab_date" value="Date" />
                            <TextInput
                                id="cab_date"
                                type="date"
                                name="cab_date"
                                value={data.cab_date}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('cab_date', e.target.value)}
                                required
                            />
                            
                             
                            <InputError message={errors.cab_date} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="time" value="Time" />
                            <TextInput
                                id="time"
                                type="time"
                                name="time"
                                value={data.time}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('time', e.target.value)}
                                required
                            />
                            <InputError message={errors.time} className="mt-2" />
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
