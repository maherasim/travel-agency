import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
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
import { router } from '@inertiajs/react';

export default function VendorList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm();
  const [selectedAction, setSelectedAction] = useState('Actions'); // Default value

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/services/fetch/client');
      setClientData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleEdit = (rowData) => {
    const url = `/que/fetch/create`;
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

  const handleActionChange = (e) => {
    setSelectedAction(e.value);
    // Handle the selected action here
  };

  const actions = [
   
    { label: 'edit', value: 'edit' }
  ];

  const actionTemplate = (rowData) => {
    return (
      <button 
      className="p-button p-button-text rounded-md px-4 py-2 bg-green-500 text-white hover:bg-blue-600 focus:outline-none mt-2" // Added mr-2 for right margin
      onClick={() => handleEdit(rowData)}
    >
      View
    </button>

    );
  };
  

  const header = (
    <div className="flex justify-between bg-pink-600 p-2 rounded-lg">
    <h2 className="text-2xl text-white font-bold mb-4">Service Requested </h2>
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
  value={clients.map(client => ({ ...client  }))}
  scrollable
  rowHover
  style={{ width: '100%' }}
  globalFilter={globalFilter}
  header={header}
>
  <Column field="id" header="ID" sortable filter filterPlaceholder="Search by ID" />
  <Column
  field="passenger_name"
  header="Full Name"
  sortable
  filter
  filterPlaceholder="Search by Full Name"
  body={(rowData) => (
    <span>{auth.user.name}</span>
  )}
/>

  <Column
    field="service_type"
    header="Service Type"
    sortable
    filter
    filterPlaceholder="Search by Service type"
  />
  
  <Column
    field="status"
    header="Status"
    sortable
    filter
    filterPlaceholder="Search by Service type"
  />
 
  <Column header="Actions" body={actionTemplate} />
</DataTable>

      </div>
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <h2 className="text-lg font-medium text-gray-900 p-5">
          Are you sure you want to delete Request?
        </h2>
        <div className="mt-6 flex justify-end p-5">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          <DangerButton className="ms-3" disabled={processing} onClick={deleteUser}>
            Delete Account
          </DangerButton>
        </div>
      </Modal>
    </Authenticated>
  );
}
