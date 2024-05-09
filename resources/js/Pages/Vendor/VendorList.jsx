import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios'; 
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { FiSearch } from 'react-icons/fi';
import { router } from '@inertiajs/react'

export default function VendorList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm();
 

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/vendor/create');
      setClientData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleEdit = (rowData) => {
    const url = `/vendor/${rowData.id}/update`;
    router.get(url)
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
    <h2 className="text-2xl text-white font-bold mb-4">Vendors List</h2>
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
      <Head title="Vendor" />
      <div className="container mt-5 mx-auto card rounded-2xl text-4xl">
        <DataTable
          value={clients}
          scrollable
          rowHover
          style={{ width: '100%' }}
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
        <h2 className="text-lg font-medium text-gray-900 p-5">
          Are you sure you want to delete Client?
        </h2>

        <div className="mt-6 flex justify-end p-5">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            className="ms-3"
            disabled={processing}
            onClick={deleteUser}
          >
            Delete Account
          </DangerButton>
        </div>
      </Modal>
    </Authenticated>
  );
}