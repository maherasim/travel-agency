import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import AlertMessage from '@/Components/AlertMessage';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { usePage } from '@inertiajs/react'
import { Head } from '@inertiajs/react'


export default function CustomerForm({ auth }) {
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { props } = usePage();
    const { errors = {} } = props; 
    
    const { data, setData, post, reset } = useForm({
        full_name: '',
        phone_number: '',
        whatsapp_number: '',
        email: '',
        // Add other fields as needed
    });

    
    const submit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!data.full_name || !data.phone_number || !data.whatsapp_number || !data.email) {
            setShowError(true);
            setMessage('Please fill in all required fields.');
            return;
        }

        post(route('customer.create'), {
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Data successfully stored');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
                reset();
            },
            onError: (errors) => {
                setShowError(true);
                setMessage('Unable to save');
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            },
        });
    };
    
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight shadow-none">Customer Form</h2>}
        >
        <Head title="Customer Form" />

            <div className=' text-vermilion-700 bg-white container-sm rounded-md shadow-sm p-4  mt-4'>
                <form onSubmit={submit}>
                 {/* Render the success message from props */}
                 {/* {props.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {props.success}
                    </div>
                )} */}
                    {showSuccess && <AlertMessage type="success" message={message} />}
                    {showError && <AlertMessage type="error" message={message} />}

                    <div>
                        <label htmlFor="full_name" className="block font-medium text-vermilion-700">Full Name</label>
                        <input
                            id="full_name"
                            name="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            type="text"
                            autoComplete="off"
                            required
                            className="text-vermilion-700 mt-1 block w-full rounded-md border-vermilion-300 focus:border-vermilion-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                       { errors.full_name && <InputError message={errors.full_name} className="mt-2" /> } 
                    </div>

                    <div className="mt-4">
                        <label htmlFor="phone_number" className="block font-medium text-vermilion-700">Phone Number</label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            type="tel"
                            autoComplete="tel"
                            className="text-vermilion-700 mt-1 block w-full rounded-md border-vermilion-300 focus:border-vermilion-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your phone number"                   
                        />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="whatsapp_number" className="block font-medium text-vermilion-700">Whatsapp Number</label>
                        <input
                            id="whatsapp_number"
                            name="whatsapp_number"
                            value={data.whatsapp_number}
                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                            type="tel"
                            autoComplete="tel"
                            className="text-vermilion-700 mt-1 block w-full rounded-md border-vermilion-300 focus:border-vermilion-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your Whatsapp number"                   
                        />
                      { errors.whatsapp_number && <InputError message={errors.whatsapp_number} className="mt-2" /> }
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="block font-medium text-vermilion-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            autoComplete="off"
                            required
                            className="text-vermilion-700 mt-1 block w-full rounded-md border-vermilion-300 focus:border-vermilion-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.email && <InputError message={errors.email} className="mt-2" /> }
                    </div>

                    {/* Add other form fields as needed */}

                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className=" w-100 items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-vermilion-500 hover:bg-vermilion-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                        >
                            {processing ? 'Processing...' : 'Save Customer Details'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
