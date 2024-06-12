import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
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
import { router } from "@inertiajs/react";

export default function VendorList({ auth }) {
    const [clients, setClientData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [confirmingStatusUpdate, setConfirmingStatusUpdate] = useState(false); // State for confirming status update
    const [viewingClientDetails, setViewingClientDetails] = useState(false); // State for viewing client details
    const { data, setData, delete: destroy, processing, reset } = useForm();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedClient, setSelectedClient] = useState(null); // State to hold the selected client
    const [vendors, setVendors] = useState([]);

    const fetchVendorData = async () => {
        try {
            const response = await axios.get("/api/vendors");
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendor data:", error);
        }
    };

    useEffect(() => {
        fetchVendorData();
    }, []);


    const fetchClientData = async () => {
        try {
            const response = await axios.get("/quo/fetch/cab");
            setClientData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchClientData();
    }, []);

    const handleStatusChange = async (itemId, value) => {
        setSelectedStatus({ itemId, value });
        setConfirmingStatusUpdate(true); // Open the confirmation modal for status update
    };

    const handleGenerateVoucher = (id) => {

        const url = `/ticket/form/cab/${id}`;
        window.open(url, '_blank');
    };
    const handleGeneratePdf = (id) => {
        window.open(`/ticketview/${id}`, '_blank');
    };


    const handleGenerateInvoice = (id) => {
        window.open(`/quotation/generate-invoice/${id}`, '_blank');
    };
    const confirmStatusChange = async () => {
        const { itemId, value } = selectedStatus;
        setConfirmingStatusUpdate(false); // Close the confirmation modal for status update

        try {
            const response = await axios.post('/qoutation/update/status', {
                id: itemId,
                status: value
            });

            // Reload the page if status is updated to "confirm", "pending", or "request more"
            if (value === 'confirm' || value === 'pending' || value === 'request more' || value === 'cancel') {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    const handleGenerateVoucherConfirm = (id) => {
        window.open(`/voucherqou/${id}`, '_blank');
    };

    const handleView = (rowData) => {
        setSelectedClient(rowData); // Set the selected client
        setViewingClientDetails(true); // Open the modal for viewing client details
    };
    const [copiedToClipboard, setCopiedToClipboard] = useState(false); // State to track if client details are copied

    const copyClientDetailsToClipboard = () => {
        if (selectedClient) {
            const clientDetailsText = `
                Client Name: ${selectedClient.client.trade_name}
                Staff Name: ${selectedClient.staff_name}
                Service Type: ${selectedClient.service_type}                
                Extra Hours Price(pr hr): ${selectedClient.extra_hour_price}
                Base Price: ${selectedClient.base_price}
                Extra KM Price(pr km): ${selectedClient.extra_km_price}
               
                Status: ${selectedClient.status}
            `;
            navigator.clipboard.writeText(clientDetailsText);
            setCopiedToClipboard(true); // Set state to true when client details are copied
            setTimeout(() => {
                setCopiedToClipboard(false); // Reset state after 3 seconds
            }, 3000);
        }
    };
    const handleVendorChange = (itemId, value) => {
        // Update the selected vendor for the specific item
        const updatedClients = clients.map((client) => {
            if (client.id === itemId) {
                return { ...client, selectedVendor: value };
            }
            return client;
        });
        setClientData(updatedClients);

        // Send the selected vendor data to the backend
        axios.post('/api/update-client-vendor', {
            id: itemId,
            vendor: value
        }).then(response => {
            console.log('Vendor data updated successfully:', response.data);
        }).catch(error => {
            console.error('Error updating vendor data:', error);
        });
    };


    const closeModal = () => {
        setConfirmingStatusUpdate(false); // Close the confirmation modal for status update
        setViewingClientDetails(false); // Close the modal for viewing client details
        reset();
    };

    const actionTemplate = (rowData) => {
        const isConfirmed = rowData.status == 'confirm';

        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-success p-button-text mr-2"
                    onClick={() => handleView(rowData)}
                    style={{ marginRight: '2px' }}
                />
                {isConfirmed && (
                    <>
                        <Button
                            icon="pi pi-ticket"
                            className="p-button-rounded p-button-success p-button-text"
                            onClick={() => handleGenerateVoucher(rowData.id)}
                            style={{ marginRight: '2px' }}
                        />
                        <Button
                            icon="pi pi-file"
                            className="p-button-rounded p-button-success p-button-text"
                            onClick={() => handleGenerateInvoice(rowData.id)}
                            style={{ marginRight: '2px' }}
                        />
                        <Button
                            icon="pi pi-info-circle"
                            className="p-button-rounded p-button-success p-button-text"
                            onClick={() => handleGenerateVoucherConfirm(rowData.id)}
                            style={{ marginRight: '2px' }}
                        />
                    </>
                )}
            </>
        );
    };

    const header = (
        <div className="flex justify-between bg-pink-600 p-2 rounded-lg">
            <h2 className="text-2xl text-white font-bold mb-4">
                View Quotation Cab
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
                        filterPlaceholder="Search by Client Name"
                    />
             


                    <Column
                        field="staff_name"
                        header="Staff"
                        sortable
                        filter
                        filterPlaceholder="Search by Staff Name"
                    />
                    <Column
                        field="service_type"
                        header="Service"
                        sortable
                        filter
                        filterPlaceholder="Search by Service Type"
                    />
                    <Column
                        header="Update Status"
                        body={(rowData) => (
                            <div>
                                <select
                                    value={selectedStatus[rowData.id] || rowData.status}
                                    onChange={(e) => handleStatusChange(rowData.id, e.target.value)}
                                    disabled={rowData.status == 'confirm'}
                                    style={{
                                        padding:
                                            '0.2rem 0.5rem',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        backgroundColor: rowData.status === 'confirm' ? '#e0e0e0' : '#f9f9f9',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="request more">Request More</option>
                                    <option value="confirm">Confirm</option>
                                    <option value="cancel">Cancel</option>
                                </select>
                            </div>
                        )}
                    />
                    <Column
                        field="extra_km_price"
                        header="Extra KM Price(pr km)"
                        sortable
                        filter
                        filterPlaceholder="Search by Guest Name"
                    />
                    <Column
                        field="extra_hour_price"
                        header="Extra Hours Price"
                        sortable
                        filter
                        filterPlaceholder="Search by Room Category"
                    />
                    <Column
                        header="Actions"
                        body={actionTemplate}
                        style={{ width: '10%' }}
                    />
                </DataTable>
            </div>
            {/* Update Status Modal */}
            <Modal show={confirmingStatusUpdate} onClose={closeModal}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Confirm Status Update
                    </h2>
                    <p>Are you sure you want to update the status?</p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={confirmStatusChange}>
                            Confirm
                        </DangerButton>
                    </div>
                </div>
            </Modal>
            {/* View Client Details Modal */}
            <Modal show={viewingClientDetails} onClose={closeModal}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Client Details
                    </h2>
                    {selectedClient && (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">{selectedClient.client.trade_name}</h2>
                            <p className="text-gray-600">Staff Name: {selectedClient.staff_name}</p>
                            <p className="text-gray-600">Service Type: {selectedClient.service_type}</p>
                            <p className="text-gray-600">Base Price : {selectedClient.base_price}</p>

                            <p className="text-gray-600">Extra Hours Price(pr hr)   : {selectedClient.extra_hour_price}</p>
                            <p className="text-gray-600">Extra KM Price(pr km): {selectedClient.extra_km_price}</p>
                             
                            <p className="text-gray-600">Status: <span className={`status ${selectedClient.status === 'confirm' ? 'bg-yellow-300' : selectedClient.status === 'request more' ? 'bg-red-500' : 'bg-gray-400'} text-black px-2 py-1 rounded-md`}>{selectedClient.status}</span></p>
                        </div>
                    )}



                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Close
                        </SecondaryButton>
                        {/* Button to copy client details to clipboard */}
                        <SecondaryButton onClick={copyClientDetailsToClipboard}>
                            Copy to Clipboard
                        </SecondaryButton>
                        {copiedToClipboard && <span className="text-green-500 ml-2">Client details copied!</span>}

                    </div>
                </div>
            </Modal>
        </Authenticated>
    );
}
