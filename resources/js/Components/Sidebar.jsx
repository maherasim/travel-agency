import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FiX, FiHome, FiGrid, FiInbox, FiUsers, FiBox, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { AiOutlineClose } from "react-icons/ai";
import { GrMenu, GrServices } from "react-icons/gr";
import { useEffect } from 'react';


const Sidebar = () => {
   
  const [isOpen, setIsOpen] = useState(true); // Initialize isOpen to true to open the sidebar by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the value of isOpen
  };

  useEffect(() => {
    // No need to return anything here, as this effect is not performing any cleanup
  }, []); // Empty dependency array to ensure this effect runs only once, similar to componentDidMount

  return (
    <>
      {/* Open Icon at the top right corner */}
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            className="text-white bg-hover:vermilion-700 hover:vermilion-200  font-medium rounded-lg text-sm px-2 py-2.5 bg-vermilion-500"
            type="button"
            onClick={toggleSidebar}
          >
            <GrMenu />
            <span className="sr-only"></span>
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? '' : '-translate-x-full'
        } bg-gray-900 rounded-2xl m-2 dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        {/* Close Icon at the top right corner of the sidebar */}
        {isOpen && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
           <AiOutlineClose />
            <span className="sr-only">Close menu</span>
          </button>
        )}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <FiHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
          </ul>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/client/register"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <FiUserPlus className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Add Client</span>
              </Link>
            </li>
          </ul>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/client/list"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <FiUsers className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">View Clients</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/vendor/register"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <FiUserPlus className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Add Vendor</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/vendor/list"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <FiUsers className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">View Vendors</span>
              </Link>
            </li>
          </ul>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/service/form"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-vermilion-700 group"
              >
                <GrServices className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:vermilion-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Service Request</span>
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
