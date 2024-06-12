import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
import InputLabelRequire from '@/Components/InputLabelRequire';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import AlertMessage from '@/Components/AlertMessage';

export default function Register({ auth }) {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const { data, setData, post, processing, errors, reset } = useForm({
        trade_name: '',
        address: '',
        email: '',
        gstin_number:'',
        phone_number: '',
        website: '',
        contact_person_email: '',
        contact_person_phone_number: '',
        birthdate: '',
        pan_number: '',
        password: '',
        tan_number: '',
        cin: '',
        gstin: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

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

    const submit = async (e) => {
        e.preventDefault();

        post(route('client.register.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Client registered successfully');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
                reset();
            },
            onError: (errors) => {
                setShowError(true);
                console.log(errors);
                setMessage('Unable to register client');
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            },
        });
    };

    return (
        <Authenticated
            user={auth.user}
        >
            <Head title="Client Register" />
            <div className='text-vermilion-700 bg-white container w-md-80 rounded-md shadow-sm p-4 mt-4'>
                <form onSubmit={submit}>
                    {showSuccess && <AlertMessage type="success" message={message} />}
                    {showError && <AlertMessage type="error" message={message} />}

                    <div className="grid grid-cols-3 gap-4">
                        <div className="mt-4">
                            <InputLabelRequire htmlFor="trade_name" value="Client Name" />

                            <TextInput
                                id="trade_name"
                                name="trade_name"
                                value={data.trade_name}
                                className="mt-1 block w-full rounded-md bg-white text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline
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
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }} // Set border style and color inline
                                autoComplete="organization"
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
                                className="mt-1 block w-full rounded-md text-black bg-white"
                                style={{ border: '2px solid pink' }} // Set border style and color inline
                                autoComplete="organization"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Add other input fields in a similar manner */}
                    </div>
                    <div className="grid grid-cols-3 gap-4">

                        <div className="mt-4">
                            <InputLabelRequire htmlFor="phone_number" value="Phone Number" />

                            <TextInput
                                id="phone_number"
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full rounded-md bg-white text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline
                                autoComplete="organization"
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                            />

                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel  htmlFor="website" value="Website" />

                            <TextInput
                                id="website"
                                name="website"
                                value={data.website}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="url"
                                onChange={(e) => setData('website', e.target.value)}
                            />

                            <InputError message={errors.website} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabelRequire htmlFor="contact_person_email" value="Contact Person's Email" />

                            <TextInput
                                id="contact_person_email"
                                type="email"
                                name="contact_person_email"
                                value={data.contact_person_email}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="email"
                                required
                                onChange={(e) => setData('contact_person_email', e.target.value)}
                            />

                            <InputError message={errors.contact_person_email} className="mt-2" />
                        </div>

                        {/* Add more sets of input fields in a similar manner */}
                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <div className="mt-4">
                            <InputLabelRequire htmlFor="contact_person_phone_number" value="Contact Person's Phone Number" />

                            <TextInput
                                id="contact_person_phone_number"
                                type="tel"
                                name="contact_person_phone_number"
                                value={data.contact_person_phone_number}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="tel"
                                required
                                onChange={(e) => setData('contact_person_phone_number', e.target.value)}
                            />

                            <InputError message={errors.contact_person_phone_number} className="mt-2" />
                        </div>

                        <div className="mt-4">
                        <InputLabel  htmlFor="birthdate" value="Birthdate" />
                        <TextInput
                            id="birthdate"
                            type="date"
                            name="birthdate"
                            value={data.birthdate}
                            className="mt-1 block w-full text-black"
                            style={{ border: '2px solid pink' }} // Set border style and color inline
                            autoComplete="off" // Explicitly turn off autocomplete for date inputs
                            onChange={(e) => setData('birthdate', e.target.value)}
                            onFocus={(e) => e.target.type = 'date'} // Change input type to 'date' when focused
                            onBlur={(e) => e.target.type = 'text'} // Change input type back to 'text' when blurred
                        />
                        <InputError message={errors.birthdate} className="mt-2" />
                    </div>


                        <div className="mt-4">
                            <InputLabelRequire htmlFor="pan_number" value="PAN Number" />
                            <TextInput
                                id="pan_number"
                                name="pan_number"
                                value={data.tax_number}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="off"
                                onChange={(e) => setData('pan_number', e.target.value)}
                            />
                            <InputError message={errors.pan_number} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="tan_number" value="TAN Number" />
                            <TextInput
                                id="tan_number"
                                name="tan_number"
                                value={data.tan_number}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="off"
                                onChange={(e) => setData('tan_number', e.target.value)}
                            />

                            <InputError message={errors.tan_number} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="cin_number" value="CIN Number" />
                            <TextInput
                                id="cin_number"
                                name="cin_number"
                                value={data.cin_number}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="off"
                                onChange={(e) => setData('cin_number', e.target.value)}
                            />
                            <InputError message={errors.cin_number} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full text-black"
                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="off"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="gstin_number" value="GSTIN Number" />

                            <TextInput
                                id="gstin_number"
                                name="gstin_number"
                                value={data.gstin_number}
                                className="mt-1 block w-full text-black"

                                style={{ border: '2px solid pink' }} // Set border style and color inline

                                autoComplete="off"
                                onChange={(e) => setData('gstin_number', e.target.value)}
                            />

                            <InputError message={errors.gstin_number} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" onClick={openModal} disabled={processing}>
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
                    <p className="text-gray-700 mt-2">Are you sure you want to register?</p>
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
