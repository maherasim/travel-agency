// resources/js/Pages/Quotation/viewhotel.jsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ViewHotel({ auth }) {
    // Extract the vendor data from the page props
    const { vendor } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="View Hotel" />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Hotel Details</h1>
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="space-y-4">
                            <p className="text-gray-700 text-lg"><strong>Guest Name:</strong> {vendor.guest_name}</p>
                            <p className="text-gray-700 text-lg"><strong>Hotel Address:</strong> {vendor.hotel_address}</p>
                            <p className="text-gray-700 text-lg"><strong>Room Category:</strong> {vendor.room_category}</p>
                            <p className="text-gray-700 text-lg"><strong>Contact No:</strong> {vendor.contact_no}</p>
                            <p className="text-gray-700 text-lg"><strong>Confirmation No:</strong> {vendor.confirmation_no}</p>
                            {/* Add more fields as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
