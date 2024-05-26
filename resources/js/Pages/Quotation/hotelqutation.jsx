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
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, delete: destroy, processing, reset } = useForm();
    const [selectedStatus, setSelectedStatus] = useState({});

    const fetchClientData = async () => {
        try {
            const response = await axios.get("/quo/fetch/hotel");
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
        setConfirmingUserDeletion(true);
    };

    const confirmStatusChange = async () => {
        const { itemId, value } = selectedStatus;
        setConfirmingUserDeletion(false);

        try {
            const response = await axios.post('/qoutation/update/status', {
                id: itemId,
                status: value
            });

            // Reload the page if status is updated to "confirm", "pending", or "request more"
            if (value === 'confirm' || value === 'pending' || value === 'request more'||value==='cancel') {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleEdit = (rowData) => {
        const url = `/hotelquotation/${rowData.id}/edit`;
        router.get(url);
    };

    const handleView = (rowData) => {
        const url = `/quotation/view/hotel/${rowData.id}`;
        router.get(url);
    };

    const handleGenerateVoucher = (id) => {
        const url = `/ticket/form/hotel/${id}`;
        window.open(url, '_blank');
    };

    const handleGenerateVoucherConfirm = (id) => {
        window.open(`/voucherqou/${id}`, '_blank');
    };

    const handleGenerateInvoice = (id) => {
        window.open(`/quotation/generate-invoice/${id}`, '_blank');
    };

    const handleDelete = (rowData) => {
        setData('quotation_id', rowData.id);
        setConfirmingUserDeletion(true);
    };

    const deleteUser = async () => {
        try {
            await destroy(route("hotel.destroy"), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    fetchClientData();
                },
                onError: () => alert("Failed to delete"),
                onFinish: () => reset(),
            });
        } catch (error) {
            console.error("Error deleting quotation:", error);
        }
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    const actionTemplate = (rowData) => {
        const isConfirmed = rowData.status === 'confirm';

        return (
            <>
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-success p-button-text mr-2"
                    onClick={() => handleView(rowData)}
                    style={{ marginRight: '2px' }}
                /> 
                {/* <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleEdit(rowData)}
                    style={{ marginRight: '2px' }}
                />  */}
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
                {/* <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-success p-button-text"
                    onClick={() => handleDelete(rowData)}
                    style={{ marginRight: '2px' }}
                /> */}
            </>
        );
    };

    const header = (
        <div className="flex justify-between bg-pink-600 p-2 rounded-lg">
            <h2 className="text-2xl text-white font-bold mb-4">
                View Quotation Hotel
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
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        backgroundColor: rowData.status == 'confirm' ? '#e0e0e0' : '#f9f9f9',
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
                        field="guest_name"
                        header="Guest Name"
                        sortable
                        filter
                        filterPlaceholder="Search by Guest Name"
                    />
                    <Column
                        field="room_category"
                        header="Room Category"
                        sortable
                        filter
                        filterPlaceholder="Search by Room Category"
                    />
                    {/* <Column
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
                                        : rowData.status == "request more"
                                        ? "bg-red-500"
                                        : rowData.status == "pending"
                                        ? "bg-gray-500"
                                        : "bg-green-500"
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
                    /> */}
                    <Column 
                        header="Actions"
                        body={actionTemplate}
                        style={{ width: '10%' }}
                    />
                </DataTable>
            </div>
           <Modal show={confirmingUserDeletion} onClose={closeModal}>
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-auto max-h-96 mx-auto">
        <h2 className="text-lg font-medium text-gray-900">
            Confirm this action?
        </h2>
        <h3 className="mt-4 text-gray-600">
            Are you sure you want to update the status?
        </h3>
        <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>
                Cancel
            </SecondaryButton>
            <DangerButton className="ml-3" onClick={confirmStatusChange}>
                OK
            </DangerButton>
        </div>
    </div>
</Modal>

        </Authenticated>
    );
}
