 import Authenticated from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabelRequire from '@/Components/InputLabelRequire';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AlertMessage from '@/Components/AlertMessage';
import InputLabel from '@/Components/InputLabel';
import React, { useState } from 'react';

export default function Register({ auth }) {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const { data, setData, post, processing, errors, reset } = useForm({
        trade_name: '',
        address: '',
        email: '',
        phone_number: '',
        website: '',
        contact_person_email: '',
        contact_person_phone_number: '',
        birthdate: '',
        pan_number: '',
        tan_number: '',
        cin_number: '',
        gstin_number: '',
        vendor_type: 'credit', // Default value for vendor type
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        post(route('vendor.register.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Vendor registered successfully');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
                reset();
            },
            onError: (errors) => {
                setShowError(true);
                console.log(errors);
                setMessage('Unable to register Vendor');
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            },
        });
    };
    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true); // Open modal
    };

    const closeModal = () => {
        setShowModal(false); // Close modal
    };

    const confirmSubmit = (e) => {
        e.preventDefault();
        setShowModal(false); // Close modal
        submit(e); // Proceed with form submission
    };
    const handleVendorTypeChange = (e) => {
        const value = e.target.value;
        setData('vendor_type', value);
        // Reset payment method when vendor type changes
        setData('payment_method', '');
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Vendor Register" />
            <div className='text-vermilion-700 bg-white w-md-80 mx-auto rounded-md shadow-sm p-4 mt-4'>
                <form onSubmit={submit} className='p-4'>
                    {showSuccess && <AlertMessage type="success" message={message} />}
                    {showError && <AlertMessage type="error" message={message} />}
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="trade_name" value="Vendor Name" />
                            <TextInput
                                id="trade_name"
                                name="trade_name"
                                value={data.trade_name}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="organization"
                                onChange={(e) => setData('trade_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.trade_name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabelRequire htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }}
                                autoComplete="street-address"
                                onChange={(e) => setData('address', e.target.value)}
                                required
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div className="mt-4">
        <InputLabelRequire htmlFor="email" value="Email" />
        <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="email"
            onChange={(e) => setData('email', e.target.value)}
            required
        />
        <InputError message={errors.email} className="mt-2" />
    </div>

                    </div>
                    <div className="grid grid-cols-3 gap-4">
  
    <div className="mt-4">
        <InputLabelRequire htmlFor="phone_number" value="Phone Number" />
        <TextInput
            id="phone_number"
            type="tel"
            name="phone_number"
            value={data.phone_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="tel"
            onChange={(e) => setData('phone_number', e.target.value)}
            required
        />
        <InputError message={errors.phone_number} className="mt-2" />
    </div>
    <div className="mt-4">
        <InputLabelRequire htmlFor="website" value="Website" />
        <TextInput
            id="website"
            name="website"
            value={data.website}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="url"
            onChange={(e) => setData('website', e.target.value)}
        />
        <InputError message={errors.website} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabel htmlFor="pan_number" value="PAN Number" />
        <TextInput
            id="pan_number"
            name="pan_number"
            value={data.pan_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="off"
            onChange={(e) => setData('pan_number', e.target.value)}
        />
        <InputError message={errors.pan_number} className="mt-2" />
    </div>

    {/* Repeat the pattern for other input fields */}
</div>

 
<div className="grid grid-cols-3 gap-4">
    <div className="mt-4">
        <InputLabelRequire htmlFor="tan_number" value="TAN Number" />
        <TextInput
            id="tan_number"
            name="tan_number"
            value={data.tan_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="off"
            onChange={(e) => setData('tan_number', e.target.value)}
        />
        <InputError message={errors.tan_number} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabelRequire htmlFor="cin_number" value="CIN Number" />
        <TextInput
            id="cin_number"
            name="cin_number"
            value={data.cin_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="off"
            onChange={(e) => setData('cin_number', e.target.value)}
        />
        <InputError message={errors.cin_number} className="mt-2" />
    </div>
    <div className="mt-4">
        <InputLabelRequire htmlFor="gstin_number" value="GSTIN Number" />
        <TextInput
            id="gstin_number"
            name="gstin_number"
            value={data.gstin_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="off"
            onChange={(e) => setData('gstin_number', e.target.value)}
        />
        <InputError message={errors.gstin_number} className="mt-2" />
    </div>

    {/* Repeat the pattern for other input fields */}
</div>

<div className="grid grid-cols-3 gap-4">
   
    <div className="mt-4">
        <InputLabelRequire htmlFor="contact_person_email" value="Contact Person's Email" />
        <TextInput
            id="contact_person_email"
            type="email"
            name="contact_person_email"
            value={data.contact_person_email}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="email"
            required
            onChange={(e) => setData('contact_person_email', e.target.value)}
        />
        <InputError message={errors.contact_person_email} className="mt-2" />
    </div>
    <div className="mt-4">
        <InputLabelRequire htmlFor="contact_person_phone_number" value="Contact Person's Phone Number" />
        <TextInput
            id="contact_person_phone_number"
            type="tel"
            name="contact_person_phone_number"
            value={data.contact_person_phone_number}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="tel"
            required
            onChange={(e) => setData('contact_person_phone_number', e.target.value)}
        />
        <InputError message={errors.contact_person_phone_number} className="mt-2" />
    </div>
    <div className="mt-4">
        <InputLabelRequire htmlFor="website" value="Website" />
        <TextInput
            id="website"
            name="website"
            value={data.website}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="url"
            onChange={(e) => setData('website', e.target.value)}
        />
        <InputError message={errors.website} className="mt-2" />
    </div>
    {/* Repeat the pattern for other input fields */}
</div>

 
<div className="grid grid-cols-3 gap-4">
<div className="mt-4">
        <InputLabelRequire htmlFor="birthdate" value="Birthdate" />
        <TextInput
            id="birthdate"
            type="date"
            name="birthdate"
            value={data.birthdate}
            className="mt-1 block w-full text-black"
            style={{ border: '2px solid pink' }}
            autoComplete="off"
            onChange={(e) => setData('birthdate', e.target.value)}
            required
        />
        <InputError message={errors.birthdate} className="mt-2" />
    </div>

    

   

    {/* Repeat the pattern for other input fields */}
</div>


                    <div className="flex items-center justify-end mt-4">                      
                        <PrimaryButton className="ms-4" disabled={processing} onClick={openModal}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            {showModal && (
    <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold" id="modal-title">Confirm Submission</h3>
                        <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-700 mt-2">Are you sure you want to Register?</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300">
                        Cancel
                    </button>
                    <button onClick={confirmSubmit} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring focus:ring-red-300">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
        </Authenticated>
    );
}
