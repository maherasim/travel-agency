
import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { FiX, FiHome,  FiPackage,  FiGrid, FiInbox, FiUsers, FiBox, FiLogIn, FiUserPlus, FiUser, FiChevronDown } from 'react-icons/fi';
import { AiOutlineClose } from "react-icons/ai";
import { GrMenu, GrServices } from "react-icons/gr";
import {  FiBell, FiSettings } from 'react-icons/fi';

import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ user, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [isServiceIconpink, setIsServiceIconpink] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleServiceDropdown = () => {
        setIsServiceDropdownOpen(!isServiceDropdownOpen);
        setIsServiceIconpink(!isServiceIconpink); // Toggle the color of the service icon
    };

    const handleInputClick = () => {
        setIsInputClicked(true);
    };

    return (
        <div className="min-h-screen bg-gray-200">

            {/* Navigation */}
            <nav className="bg-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <img className="block h-9 w-auto fill-current text-pink-600" src={'https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png'} alt="Logo" />
                        </Link>
                    </div>

                    {/* Centered Input Group */}
                    <div className="flex items-center justify-center">
                        <div className="input-group input-group-outline">
                            <label className="form-label">Type here...</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center">
                        {/* Toggle Button */}
                        {!isOpen && (
                            <button
                                className="text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-red-700 font-medium rounded-lg text-sm px-4 py-2 bg-red-600 mr-4"
                                type="button"
                                onClick={toggleSidebar}
                            >
                                <GrMenu />
                                <span className="sr-only">Open menu</span>
                            </button>
                        )}
<div className="flex items-center">
    {/* Bell Icon */}
    <FiBell className="w-10 h-14 mr-5" style={{ fill: 'rgba(0, 0, 0, 0.6)' }}  />

    {/* User Icon */}
    <FiUser className="w-10 h-14 mr-5" style={{ fill: 'rgba(0, 0, 0, 0.6)' }}  />

    {/* Settings Icon */}
    <FiSettings className="w-10 h-14 mr-5"  style={{ fill: 'rgba(0, 0, 0, 0.6)' }} />
</div>

                        {/* User Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-pink-600 bg-white hover:text-pink-600 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {user.name}
                                    <svg
                                        className="ml-2 -me-0.5 h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <ResponsiveNavLink href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-pink-600 hover:bg-pink-600">
                                    Log Out
                                </ResponsiveNavLink>
                            </Dropdown.Content>
                        </Dropdown>

                        {/* Settings Icon */}

                    </div>
                </div>
            </nav>

            {/* Sidebar */}

            <div
    id="sidenav-main"
    className={`navbar-vertical fixed top-3 bottom-25 left-4 z-50 w-64 h-full mb-4 p-2 overflow-y-auto transition-transform ${isOpen ? '' : '-translate-x-full'} bg-gray-800 border-b border-pink-600 rounded-l-xl rounded-r-xl`}
    tabIndex="-1"
    aria-labelledby="drawer-navigation-label"
>

                {/* Menu Items */}
                <ul className="space-y-7 font-medium">
                    {/* Dashboard */}
                    {/* Dashboard */}
                    {/* Dashboard */}
                    <div className="flex items-center p-2">
                        <FiBox className="w-6 h-2 mr-2 text-white" />
                        <h3 className="text-lg text-white font-bold">Travel Agency</h3>
                    </div>
                    <hr className="border-pink-600 bg-pink-600" />

                    <li className="p-0">
                        <Link
                            href="/dashboard"
                            className={`flex items-center p-2 rounded-lg text-white hover:bg-pink-600 ${route().current('dashboard') ? 'bg-pink-600' : ''}`}
                        >
                            <FiHome className="w-10 h-4 mr-1" style={{ fill: 'pink' }} />
                            <span className="text-lg">Dashboard</span> {/* Increase the font size of the text */}
                        </Link>
                    </li>

                    {user.role_id == 1 && (
                        <li className="relative p-0">
                            <button
                                onClick={toggleServiceDropdown}
                                className={`flex items-center justify-between p-2 rounded-lg text-white focus:outline-none ${isServiceDropdownOpen ? 'bg-pink-600' : 'hover:bg-pink-600'}`}
                            >
                                <GrServices className="w-26 h-15 mr-2" style={{ fill: isServiceIconpink ? 'pink' : 'white' }} />
                               Manage  Quotation
                                <FiChevronDown className={`w-9 h-75 ml-auto transition-transform ${isServiceDropdownOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            {isServiceDropdownOpen && (

                                 <ul className="ml-5 space-y-2">

                                     <li className="p-0">
                                         <Link href="/services/form" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                             <FiPackage className="w-10 h-10 mr-2" style={{ fill: 'pink' }} /> {/* Adjust the size of the icon */}
                                             <span className="text-lg">Services Form</span> {/* Increase the font size of the text */}
                                         </Link>
                                     </li>
                                     <li className="p-0">
                                         <Link href="/quotation/form/fetch" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                             <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'pink' }} /> {/* Adjust the size of the icon */}
                                             <span className="text-lg"> Generate Quotation</span> {/* Increase the font size of the text */}
                                         </Link>
                                     </li>
                                     <li className="p-0">
                                         <Link href="/quotation/form/fetch/admin" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                             <FiInbox className="w-10 h-10 mr-2" style={{ fill: 'pink' }} /> {/* Adjust the size of the icon */}
                                             <span className="text-lg"> View Quotation</span> {/* Increase the font size of the text */}
                                         </Link>
                                     </li>




                                 </ul>


                            )}
                        </li>
                    )}
                    {user.role_id == 2 && (
                        <li className="p-0">
                            <Link href="/services/form" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiHome className="w-10 h-4 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">Generate Query</span> {/* Increase the font size of the text */}
                            </Link>
                        </li>
                    )}
                    {user.role_id == 2 && (
                        <li className="p-0">
                            <Link href="/services/form/fetch" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiHome className="w-10 h-4 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">View Quoatation</span> {/* Increase the font size of the text */}
                            </Link>
                        </li>
                    )}

{user.role_id == 1 && (
                <li className="p-0">
                                         <Link href="/services/form/fetch/admin" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                             <FiHome className="w-10 h-10 mr-2" style={{ fill: 'pink' }} /> {/* Adjust the size of the icon */}
                                             <span className="text-lg"> View Services Form</span> {/* Increase the font size of the text */}
                                         </Link>
                                     </li>
                 )}
                    {user.role_id == 1 && (
                        <li className="relative p-0">
                            <button
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                className={`flex items-center justify-between p-2 rounded-lg text-white focus:outline-none ${isClientDropdownOpen ? 'bg-pink-600' : 'hover:bg-pink-600'}`}
                            >
                                <span className="flex items-center">
                                    <FiUsers className="w-25 h-9 mr-2" style={{ fill: 'pink' }} />
                                    <span className="text-lg">Clients   </span> {/* Increase the font size of the text */}

                                </span>
                                <FiChevronDown className={`w-9 h-7 transition-transform ${isClientDropdownOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            {isClientDropdownOpen && (
                                <ul className="ml-5 space-y-2">
                                    <li className="p-0">
                                        <Link href="/client/register" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                            <FiUserPlus className="w-26 h-9 mr-2" style={{ fill: 'pink' }} />
                                            <span className="text-lg">Add Clients</span> {/* Increase the font size of the text */}

                                        </Link>
                                    </li>
                                    <li className="p-0">
                                        <Link href="/client/list" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                            <FiUsers className="w-26 h-9 mr-2" style={{ fill: 'pink' }} />
                                            <span className="text-lg">View Clients</span> {/* Increase the font size of the text */}

                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    {/* Vendors Dropdown */}
                    {user.role_id == 1 && (
                        <li className="relative p-0">
                            <button
                                onClick={() => setIsVendorDropdownOpen(!isVendorDropdownOpen)}
                                className={`flex items-center justify-between p-2 rounded-lg text-white focus:outline-none ${isVendorDropdownOpen ? 'bg-pink-600' : 'hover:bg-pink-600'}`}
                            >
                                <span className="flex items-center">
                                    <FiUser className="w-26 h-4 mr-1" style={{ fill: 'pink' }} />
                                    <span className="text-lg">Vendors</span> {/* Increase the font size of the text */}

                                </span>
                                <FiChevronDown className={`w-9 h-7 transition-transform ${isVendorDropdownOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            {isVendorDropdownOpen && (
                                <ul className="ml-5 space-y-2">
                                    <li className="p-0">
                                        <Link href="/vendor/register" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                            <FiUserPlus className="w-26 h-15 mr-1" style={{ fill: 'pink' }} />
                                            <span className="text-lg"> Add Vendors</span> {/* Increase the font size of the text */}
                                        </Link>
                                    </li>
                                    <li className="p-0">
                                        <Link href="/vendor/list" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                            <FiUsers className="w-26 h-15 mr-2" style={{ fill: 'pink' }} />
                                            <span className="text-lg"> View Vendors</span> {/* Increase the font size of the text */}

                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}

                    {user.role_id == 1 && (
                       <li className="p-0">
                       <Link
                           href="/completed/request"
                           className={`flex items-center p-2 rounded-lg text-white ${
                               route().current('completed/request') ? 'bg-pink-600' : 'hover:bg-pink-600'
                           }`}
                       >
                           <FiGrid className="w-6 h-7 mr-2" style={{ fill: 'pink' }} />
                           <span className="text-lg">Completed Request</span> {/* Increase the font size of the text */}
                           {route().current('completed/request') && <span className="ml-auto">Selected Indicator</span>}
                       </Link>
                   </li>
                    )}

                    {user.role_id == 1 && (
                        <li className="p-0">
                            <Link href="/payment" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiInbox className="w-26 h-7 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">Payment</span> {/* Increase the font size of the text */}

                            </Link>
                        </li>

                    )}
                    {user.role_id == 1 && (
                        <li className="p-0">
                            <Link href="/billing" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiInbox className="w-26 h-6 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">Bliings</span> {/* Increase the font size of the text */}

                            </Link>
                        </li>
                    )}

                    {user.role_id == 1 && (
                        <li className="p-0">
                            <Link href="/role" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiInbox className="w-26 h-6 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">Role</span> {/* Increase the font size of the text */}

                            </Link>
                        </li>
                    )}
                    {user.role_id == 1 && (
                        <li className="p-0">
                            <Link href="/sales" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                                <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'pink' }} />
                                <span className="text-lg">Sales</span> {/* Increase the font size of the text */}

                            </Link>
                        </li>)}

                    {/* <li className="p-0">
                        <Link href="/logout" className="flex items-center p-2 rounded-lg text-white hover:bg-pink-600">
                            <FiLogIn className="w-6 h-6 mr-2" style={{ fill: 'pink' }} />
                            Logout
                        </Link>
                    </li> */}
                </ul>
            </div>

            {/* Main content */}
            <main className={`main-content-1 border-radius-lg z-10 ${isOpen ? 'pl-64' : 'pl-0'}`}>
                {children}
            </main>
        </div>
    );
}
