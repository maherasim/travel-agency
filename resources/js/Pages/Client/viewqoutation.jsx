import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function VendorList({ auth }) {
  const [quotations, setQuotations] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});
  const [flashMessage, setFlashMessage] = useState('');

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/services/fetch/create');
      setQuotations(response.data.quotations);
      setServiceRequests(response.data.serviceRequests);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);
  const handleEdit = (rowData) => {
    const url = `/services/edit/${rowData.id}`;
    router.get(url)

  };

  const handleDelete = (rowData) => {
    setData('quotation_id', rowData.id);
    setConfirmingUserDeletion(true);
  };



  const handleStatusChange = async (itemId, value) => {
    const isConfirmed = window.confirm(`Are you sure you want to update the status to ${value}?`);
    if (!isConfirmed) return;

    try {
      const response = await axios.post('/services/update/status', {
        id: itemId,
        status: value
      });

      // Update the local state with the new status
      if (response.status === 200) {
        let message = '';
        if (value === 'reject') {
          message = 'Status updated to Pending successfully';
        } else if (value === 'request more') {
          message = 'Status updated to Request More successfully';
        } else if (value === 'accept') {
          message = 'Status updated to Confirm successfully';
        }

        setFlashMessage(message);
        setSelectedStatus({ ...selectedStatus, [itemId]: value });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setFlashMessage('Error updating status');
    }
  };

  return (
    <Authenticated user={auth.user}>
      <Head title="Vendor" />
      <div className="container mt-5 mx-auto">
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
        <div className="p-grid" style={{ paddingLeft: '3rem' }}>
          <div className="p-col-6 p-md-6">
            <Card className="rounded-2xl text-4xl" style={{ marginBottom: '2rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
              <div className="p-card-header" style={{ paddingLeft: '18rem', fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '0.5rem', backgroundColor: '#5a67d8', color: 'white', borderRadius: '0.5rem 0.5rem 0 0' }}>Service Requests</div>
              {serviceRequests.map(serviceRequest => (
                <div className="p-card-body" key={serviceRequest.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.5rem', fontSize: '1.2rem', backgroundColor: '#f9f9f9', borderRadius: '0 0 0.5rem 0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ display: 'grid', gap: '0.3rem', color: '#333' }}>
                    <div style={{ fontWeight: 'bold' }}>Service Type:</div>
                    <div style={{ fontWeight: 'bold' }}>Passenger Number :</div>
                    <div style={{ fontWeight: 'bold' }}>  Name :</div>
                    <div style={{ fontWeight: 'bold' }}>One Way/Roundway:</div>
                    <div style={{ fontWeight: 'bold' }}>Domestic/International:</div>
                    <div style={{ fontWeight: 'bold' }}>From (Location):</div>
                    <div style={{ fontWeight: 'bold' }}>To (Location):</div>
                  </div>
                  <div style={{ display: 'grid', gap: '0.3rem' }}>
                    <div>{serviceRequest.service_type}</div>
                    <div>{serviceRequest.passenger_number}</div> 
                    <div>{serviceRequest.passenger_name}</div> 
                    <div>{serviceRequest.oneway_roundway}</div>
                    <div>{serviceRequest.domestic_international}</div>
                    <div>{serviceRequest.from_location}</div>
                    <div>{serviceRequest.to_location}</div>
                  </div>
                </div>
              ))}
            </Card>


            <Card className="rounded-2xl text-4xl" style={{ marginBottom: '2rem' }}>
              {quotations.map(quotation => (
                <Card key={quotation.id} className="rounded-2xl text-4xl" style={{ width: '100%', height: '10%', marginBottom: '2rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc' }}>
                  <div className="p-card-header" style={{ paddingLeft: '18rem', fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '0.5rem', backgroundColor: '#5a67d8', color: 'white', borderRadius: '0.5rem 0.5rem 0 0' }}>Quotation {quotation.id}</div>
                  <div className="p-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.5rem', fontSize: '1.2rem', backgroundColor: '#f9f9f9', borderRadius: '0 0 0.5rem 0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ display: 'grid', gap: '0.3rem', color: '#333' }}>
                      <div style={{ fontWeight: 'bold' }}>Total Cost:</div>
                      <div style={{ fontWeight: 'bold' }}>Arrival Time:</div>
                      <div style={{ fontWeight: 'bold' }}>Airline Name:</div>
                      <div style={{ fontWeight: 'bold' }}>Fare Type:</div>
                      <div style={{ fontWeight: 'bold' }}>Flight Number:</div>
                      <div style={{ fontWeight: 'bold' }}>Departure Time:</div>
                      <div style={{ fontWeight: 'bold' }}>Status:</div>
                    </div>
                    <div style={{ display: 'grid', gap: '0.3rem' }}>
                      <div>{quotation.total_cost}</div>
                      <div>{quotation.arrival_time}</div>
                      <div>{quotation.airline_name}</div>
                      <div>{quotation.fare_type}</div>
                      <div>{quotation.flight_number}</div>
                      <div>{quotation.departure_time}</div>
                      <div>
                        <select
                          value={selectedStatus[quotation.id] || quotation.status}
                          onChange={(e) => handleStatusChange(quotation.id, e.target.value)}
                          style={{ padding: '0.2rem 0.5rem', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', fontSize: '1rem' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="request more">Request More</option>
                          <option value="confirm">Confirm</option> {/* Update this line */}
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </Card>

          </div>
        </div>
        {flashMessage && (
          <div className="bg-green-500 text-white p-2 rounded-md mt-2">
            {flashMessage}
          </div>
        )}
      </div>
    </Authenticated>
  );
}
