import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';


import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { FiSearch } from "react-icons/fi";
import { router } from "@inertiajs/react";

export default function VendorList({ auth }) {
    const [clients, setClientData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, delete: destroy, processing, reset } = useForm();
    const [selectedAction, setSelectedAction] = useState("Actions"); // Default value
    const [selectedStatus, setSelectedStatus] = useState({});

    const fetchClientData = async () => {
        try {
            const response = await axios.get("/quo/fetch/admin");
            setClientData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchClientData();
    }, []);

    const handleStatusChange = async (itemId, value) => {
        const isConfirmed = window.confirm(`Are you sure you want to update the status to ${value}?`);
        if (!isConfirmed) return;
    
        try {
            const response = await axios.post('/qoutation/update/status', {
                id: itemId,
                status: value
            });
            
            // Handle successful response if needed
            
            // Reload the page if status is updated to "confirm", "pending", or "request more"
            if (value === 'confirm' || value === 'pending' || value === 'request more') {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating status:", error);
            // Handle error here
        }
    };
    
    
    

    const handleView = (rowData) => {
        const url = `/quotation/view/${rowData.id}`;
        router.get(url);
    };
   
    const handleEdit = (rowData) => {
        const url = `/quotation/${rowData.id}/edit`;
         router.get(url);
    };

    const handleGeneratePdf = (id) => {
        window.open(`/ticketview/${id}`, '_blank');
    };

    const handleGenerateInvoice = (id) => {
        window.open(`/quotation/generate-invoice/${id}`, '_blank');
    };
    const handleGeneratevoucher = (id) => {
        const url = `/ticket/form/flight/${id}`;
        window.open(url, '_blank');
    };
    const handleDelete = (rowData) => {
        setData('quotation_id', rowData.id);
        setConfirmingUserDeletion(true);
      };
    
    const deleteUser = async () => {
        try {
            await destroy(route("quotation.destroy"), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    // Refresh the table after successful deletion
                    fetchClientData();
                },
                onError: () => alert("Failed to delete"),
                onFinish: () => reset(),
            });
        } catch (error) {
            console.error("Error deleting qoutation:", error);
        }
    };
    console.log(clients);
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    const handleActionChange = (e) => {
        setSelectedAction(e.value);
        // Handle the selected action here
    };

    const actions = [{ label: "edit", value: "edit" }];
    

    const actionTemplate = (rowData) => {
        const isConfirmed = rowData.status === 'confirm';
    
        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-success p-button-text mr-2"
                    onClick={() => handleView(rowData)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                /> 
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleEdit(rowData)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                /> 
                 {isConfirmed && (
                     <>
                <Button
                    icon="pi pi-ticket"  
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleGeneratevoucher(rowData.id)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                />
                                <Button
                    icon="pi pi-info-circle"  
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleGeneratePdf(rowData.id)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                />
                <Button
                    icon="pi pi-file"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleGenerateInvoice(rowData.id)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                />
                 </>
                 )}
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleDelete(rowData)}
                    style={{ marginRight: '2px' }} // Adjust margin as needed
                    
                />   
            </>
        );
    };
    
    const header = (
        <div className="flex justify-between bg-pink-600 p-2 rounded-lg">
            <h2 className="text-2xl text-white font-bold mb-4">
                View Quoatation
            </h2>
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
                    value={clients.map((client) => ({
                        ...client,
                        clientName: client.client.trade_name,
                    }))}
                    scrollable
                    rowHover
                    style={{ width: "100%" }}
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        filter
                        filterPlaceholder="Search by ID"
                        style={{ width: '3%' }}
                    />
                    <Column
                        field="clientName"
                        header="Client Name"
                        sortable
                        filter
                        filterPlaceholder="Search by Full Name"
                    />
                    <Column
                        field="staff_name"
                        header="Staff "
                        sortable
                        filter
                        filterPlaceholder="Search by Airline Name"
                    />
                    <Column
                        field="service_type"
                        header="Service  "
                        sortable
                        filter
                        filterPlaceholder="Search by Airline Name"
                    />

<Column
  header="update Status"
  body={(rowData) => (
    <div>
      <select
        value={selectedStatus[rowData.id] || rowData.status}
        onChange={(e) => handleStatusChange(rowData.id, e.target.value)}
        style={{
          padding: '0.2rem 0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          fontSize: '1rem'
        }}
      >
        <option value="pending">Pending</option>
        <option value="request more">Request More</option>
        <option value="confirm">Confirm</option>
      </select>
    </div>
  )}
/>


                    <Column
                        field="departure_date"
                        header="Departure Date"
                        sortable
                        filter
                        filterPlaceholder="Search by Airline Name"
                    />

                    <Column
                        field="fare_type"
                        header="Fare Type"
                        sortable
                        filter
                        filterPlaceholder="Search by Fare Type"
                    />
                          {/* <Column
                        field=" "
                        header="Vendor"
                        sortable
                        filter
                        filterPlaceholder="Search by Fare Type"
                    /> */}
                    <Column
                        field="status"
                        header="Status"
                        sortable
                        filter
                        filterPlaceholder="Search by Status"
                        body={(rowData) => (
                            <div
                                className={
                                    rowData.status === "confirm"
                                        ? "bg-green-500"
                                        : rowData.status === "request more"
                                        ? "bg-red-500"
                                        : rowData.status === "pending"
                                        ? "bg-gray-500"
                                        :"bg-green-500"
                                }
                                style={{
                                    display: "inline-block",
                                    padding: "0.5rem",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                {rowData.status}
                            </div>
                        )}
                    />

                    <Column 
                    header="Actions"
                    body={actionTemplate} 
                    style={{ width: '10%' }}
                     
                     />
                </DataTable>
            </div>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <h2 className="text-lg font-medium text-gray-900 p-5">
                    Are you sure you want to delete Request?
                </h2>
                <div className="mt-6 flex justify-end p-5">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
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
