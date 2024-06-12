import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { router } from '@inertiajs/react'
import 'primeicons/primeicons.css';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios'; 
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ClientList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm();


const fetchClientData = async () => {
    try {
    const response = await axios.get('/client/create');
    setClientData(response.data.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

useEffect(() => {
fetchClientData();
}, []);

const handleEdit = (rowData) => {
  const url = `/client/${rowData.id}/update`;
  router.get(url)
};

  const handleDelete = (rowData) => {
    setData('client_id', rowData.id);
    setConfirmingUserDeletion(true);
  };

  const deleteUser = async () => {
    try {
      await destroy(route('client.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
          // Refresh the table after successful deletion
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

  const actionButtonTemplate = (rowData) => {
    return (
      <div>
        <button
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => handleEdit(rowData)}
        >
          <i className="pi pi-pencil"></i>
        </button>
        <button
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData)}
        >
          <i className="pi pi-trash"></i>
        </button>
      </div>
    );
  };

  const header = (
    <div className="flex justify-between bg-pink-600 p-2 rounded-lg">
    <h2 className="text-2xl text-white font-bold mb-4">Clients List</h2>
    <span className="p-input-icon-left">
      <InputText
        type="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="bg-pink-200 rounded-md px-2 py-1"
      />
    </span>
  </div>
  
  );

  return (
    <Authenticated user={auth.user}>
      <Head title="Clients" />
      <div className="container mt-5 mx-5 card rounded-2xl text-4xl mx-auto">
        <DataTable
          value={clients}
          scrollable
          rowHover
          tableStyle={{ minWidth: '50rem' }}
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-striped p-datatable-gridlines"

        >
          <Column
            field="id"
            header="ID"
            sortable
            filter
            filterPlaceholder="Search by ID"
          />
          <Column
            field="trade_name"
            header="Full Name"
            sortable
            filter
            filterPlaceholder="Search by Full Name"
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by Email"
          />
          <Column
            field="phone_number"
            header="Phone Number"
            sortable
            filter
            filterPlaceholder="Search by Phone Number"
          />
          <Column header="Actions" body={actionButtonTemplate} />
        </DataTable>
      </div>
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
  <div className="bg-white rounded-lg overflow-hidden shadow-xl">
    <div className="p-5">
      <h2 className="text-lg font-medium text-gray-900">
        Are you sure you want to delete the client?
      </h2>
    </div>
    <div className="px-5 py-4 bg-gray-100 flex justify-end">
      <button
        className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring focus:ring-red-300"
        disabled={processing}
        onClick={deleteUser}
      >
        {processing ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  </div>
</Modal>

    </Authenticated>
  );
}
