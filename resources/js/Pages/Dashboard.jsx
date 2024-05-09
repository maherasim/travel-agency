import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import axios from 'axios';
import { HiOutlineUsers, HiOutlineClipboardCheck, HiOutlineShoppingBag, HiOutlineHome } from 'react-icons/hi';
import { GrServices } from 'react-icons/gr';

export default function Dashboard({ auth }) {
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalServiceRequests, setTotalServiceRequests] = useState(0);
  const [totalServiceCompleted, setTotalServiceCompleted] = useState(0);
  const [todayQuotation, setTodayQuotation] = useState(0);

  useEffect(() => {
    axios
      .get('/api/dashboard')
      .then((response) => {
        setTotalVendors(response.data.totalVendors);
        setTotalServiceRequests(response.data.totalServiceRequests);
        setTotalServiceCompleted(response.data.totalServiceCompleted);
        setTodayQuotation(response.data.todayQuotation);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });

    axios
      .get('/total-clients')
      .then((response) => {
        setTotalClients(response.data.totalClients);
      })
      .catch((error) => {
        console.error('Error fetching total clients:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900"> {/* Adjust the background color here */}
      <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
        <Head title="Dashboard" />
        <div className="container mt-3 mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Vendors Card */}
            {auth.user.role_id == 1 && (
         <div className="card bg-white-500 mt-4 rounded-lg shadow-md p-0 text-white">
    <div className="card-header p-3 pt-2 relative">
    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 absolute top-0 start-14 translate-middle-x">
    <HiOutlineUsers className="material-icons opacity-10" />
</div>

        <div className="text-end pt-1">
            <h3 className="text-lg font-semibold mb-0">Total Vendors</h3>
            <p className="text-base">{totalVendors}</p>
        </div>
    </div>
    <hr className="dark horizontal my-0" />
    <div className="card-footer p-3">
        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than last month</p>
    </div>
</div>

            )}

            {/* Total Clients Card */}
            {auth.user.role_id == 1 && (
              <div className="card bg-white-400 rounded-lg shadow-md mt-4 p-0 text-white">
                <div className="card-header p-3 pt-2 relative flex items-center">
                <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 absolute top-0 start-14 translate-middle-x">
                    <HiOutlineClipboardCheck className="material-icons opacity-10" />
                  </div>
                  <div className="flex-grow text-right">
                    <h3 className="text-lg font-semibold mb-0">Total Clients</h3>
                    <p className="text-lg font-semibold mb-0 text-gray-700">{totalClients}</p>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                  <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span><span className="text-gray-700">than last month</span></p>
                </div>
              </div>
            )}

            {/* Total Service Requests Card */}
            <div className="card bg-white-400 rounded-lg shadow-md mt-4 p-0 text-white">
              <div className="card-header p-3 pt-2 relative flex items-center">
              <div className="icon icon-lg icon-shape bg-orange-500 shadow-primary text-center border-radius-xl mt-n4 absolute top-0 start-14 translate-middle-x">
                  <HiOutlineShoppingBag className="material-icons opacity-10" />
                </div>
                <div className="flex-grow text-right">
                  <h3 className="text-lg font-semibold mb-0">  Service Requested</h3>
                  <p className="text-lg font-semibold mb-0 text-gray-700">{totalServiceRequests}</p>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span><span className="text-gray-700">than last month</span></p>
              </div>
            </div>

            {/* Total Service Completed Card */}
            <div className="card bg-white-400 rounded-lg shadow-md p-0  mt-4 text-white">
              <div className="card-header p-3 pt-2 relative flex items-center">
              <div className="icon icon-lg icon-shape bg-blue-500 shadow-primary text-center border-radius-xl mt-n4 absolute top-0 start-14 translate-middle-x">
                  <GrServices className="material-icons opacity-10" />
                </div>
                <div className="flex-grow text-right">
                  <h3 className="text-base font-semibold mb-0">  Service Completed</h3>
                  <p className="text-lg font-semibold mb-0 text-gray-700">{totalServiceCompleted}</p>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span><span className="text-gray-700">than last month</span></p>
              </div>
            </div>

            {/* Today's Quotation Card */}
            <div className="card bg-white-400 rounded-lg shadow-md mt-4 p-0 text-white">
              <div className="card-header p-3 pt-2 relative flex items-center">
              <div className="icon icon-lg icon-shape bg-green-500 mt-14 shadow-primary text-center border-radius-xl mt-n4 absolute top-0 start-14 translate-middle-x">
                  <HiOutlineHome className="material-icons opacity-10" />
                </div>
                <div className="flex-grow text-right">
                  <h3 className="text-lg font-semibold mb-0">Today's Quotation</h3>
                  <p className="text-lg font-semibold mb-0 text-gray-700">{todayQuotation}</p>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span><span className="text-gray-700">than last month</span></p>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </div>
  );
}
