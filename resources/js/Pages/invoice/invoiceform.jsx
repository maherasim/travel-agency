import { useState, useEffect } from 'react';

import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
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
    const { data, setData, post, processing, errors, reset } = useForm({
        invoice_number: "",
        description: "",
        management_fee: "",
        cgst: "",
        sgst: "",
        total: "",
        clientName: "",
    });

    useEffect(() => {
        const selectedClient = localStorage.getItem("selectedClient");
        if (selectedClient) setData('clientName', selectedClient);
    }, []);

    const selectedClient = localStorage.getItem("selectedClient");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setIsModalVisible(true);
    };

    const confirmSubmit = async () => {
        post(route('invoice.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Invoice created successfully');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
                reset();
            },
            onError: (errors) => {
                setShowError(true);
                console.log(errors);
                setMessage('Unable to create invoice');
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
            <Head title="Invoice " />
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="invoice_number" value="Invoice Number" />
                            <TextInput
                                id="invoice_number"
                                name="invoice_number"
                                value={data.invoice_number}
                                className="mt-1 block w-full rounded-md bg-white text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('invoice_number', e.target.value)}
                                onClick={(e) => setData('clientName', selectedClient)}
                                required
                            />
                            <InputError message={errors.invoice_number} className="mt-2" />
                        </div>
                       
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="management_fee" value="Management Fee" />
                            <TextInput
                                id="management_fee"
                                type="number"
                                name="management_fee"
                                value={data.management_fee}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('management_fee', e.target.value)}
                                required
                            />
                            <InputError message={errors.management_fee} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        
                        {/* <div className="mt-4">
                            <InputLabel htmlFor="sgst" value="SGST" />
                            <TextInput
                                id="sgst"
                                name="sgst"
                                type="number"
                                value={data.sgst}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="url"
                                onChange={(e) => setData('sgst', e.target.value)}
                            />
                            <InputError message={errors.sgst} className="mt-2" />
                        </div> */}
                        {/* <div className="mt-4">
                            <InputLabel htmlFor="total" value="Total" />
                            <TextInput
                                id="total"
                                name="total"
                                type="number"
                                value={data.total}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="url"
                                onChange={(e) => setData('total', e.target.value)}
                            />
                            <InputError message={errors.total} className="mt-2" />
                        </div> */}
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
                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to submit this form?
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={confirmSubmit} className="ml-3">
                            Confirm
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    );
}
