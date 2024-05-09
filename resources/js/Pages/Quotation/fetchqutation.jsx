import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react'; // Import the useForm hook
import axios from 'axios';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';

export default function VendorList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm(); // Initialize the useForm hook

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/quo/fetch/admin');
      setClientData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (rowData) => {
    const url = `/quotation/view/${rowData.id}`;
    router.get(url);
  };

  const handleDelete = (rowData) => {
    setData('vendor_id', rowData.id);
    setConfirmingUserDeletion(true);
  };

  const deleteUser = async () => {
    try {
      await destroy(route('vendor.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
          // Refresh the data after successful deletion
          fetchClientData();
        },
        onError: () => alert('Failed to delete'),
        onFinish: () => reset(),
      });
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Vendor" />
      <div className="flex justify-center">
        <div className="container mt-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ maxWidth: '1200px' }}>
          {clients.map((client) => (
            <div key={client.id} style={{ paddingLeft: '12.5rem' }} className="bg-white rounded-lg shadow-md p-4 transition duration-500 ease-in-out transform hover:scale-105 w-full">
              <h2 className="text-lg font-semibold mb-2">{client.client.trade_name}</h2>
              <p className="text-black">Staff Name: {client.staff_name}</p>
              <p className="text-black">Service Type: {client.service_type}</p>
              <p className="text-black">Departure Date: {client.departure_date}</p>
              <p className="text-black">Departure Time: {client.departure_time}</p>
              <p className="text-black">Airline Name: {client.airline_name}</p>
              <p className="text-black">Arrival Time: {client.arrival_time}</p>  
              <p className="text-black">Total Cost: {client.total_cost}</p> 
              <p className="text-black">Fare Type: {client.fare_type}</p>
              <p className="text-black">Flight Number: {client.flight_number}</p>
              <p className="text-black">Status: <span style={{ paddingLeft: '2.5rem' }} className={`status ${client.status === 'confirm' ? 'bg-yellow-300' : client.status === 'request more' ? 'bg-red-500' : 'bg-white'} text-black`}>{client.status}</span></p>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
