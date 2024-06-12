import React, { useState, useEffect } from 'react';

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

export default function Register({ auth, vendors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        invoice_number: "",        
        management_fee: "",        
        prf: "",
        ourcost: "",
        total_cost: "0.0",        
        clientName: "",
    });

    useEffect(() => {
        const selectedClient = localStorage.getItem("selectedClient");
        if (selectedClient) setData('clientName', selectedClient);
    }, []);

 

    useEffect(() => {
        // Calculate total_cost whenever prf or ourcost changes
        const totalCost = parseFloat(data.prf) + parseFloat(data.ourcost);
        setData(prevData => ({
            ...prevData,
            total_cost: isNaN(totalCost) ? "0.0" : totalCost.toFixed(2)
        }));
    }, [data.prf, data.ourcost]);


    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPriceModule, setShowPriceModule] = useState(false);

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
                                required
                            />
                            <InputError message={errors.invoice_number} className="mt-2" />
                        </div>
                       
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="management_fee" value="Vendor Name" />
                            <select
                                id="vendor"
                                name="vendor"
                                value={data.vendor}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                onChange={(e) => setData('vendor', e.target.value)}
                                required
                            >
                                <option value="">Select Vendor Name</option>
                                {vendors.map((vendor) => (
                                    <option key={vendor.id} value={vendor.trade_name}>
                                        {vendor.trade_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.management_fee} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={showPriceModule}
                                onChange={(e) => setShowPriceModule(e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Do you want to change the price?</span>
                        </label>
                    </div>

                    {showPriceModule && (
                          <div className="grid grid-cols-3 gap-4">
                           <div className="mt-4">
                            <InputLabelRequire htmlFor="ourcost" value="Our Cost" />
                            <TextInput
                                id="ourcost"
                                type="number"
                                name="ourcost"
                                value={data.ourcost}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                onChange={(e) => setData('ourcost', e.target.value)}
                                required
                            />
                            <InputError message={errors.ourcost} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="prf" value="PRF" />
                            <TextInput
                                id="prf"
                                type="number"
                                name="prf"
                                value={data.prf}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                onChange={(e) => setData('prf', e.target.value)}
                                required
                            />
                            <InputError message={errors.prf} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="total_cost" value="Total Cost" />
                            <TextInput
                                id="total_cost"
                                type="number"
                                name="total_cost"
                                value={data.total_cost}
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }}
                                onChange={(e) => setData('total_cost', e.target.value)}
                                required
                            />
                            <InputError message={errors.total_cost} className="mt-2" />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton type="submit" className="ms-4" disabled={processing}>
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
