import React from 'react';

const AlertMessage = ({ type, message }) => {
    let bgColor, textColor, icon;

    // Set background, text color, and icon based on alert type
    switch (type) {
        case 'success':
            bgColor = 'bg-green-100';
            textColor = 'text-green-700';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
            );
            break;
        case 'error':
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
            );
            break;
        case 'info':
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-700';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
                    <path fillRule="evenodd" d="M11 3.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM12 15.25a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zM12 4.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V5.5a.75.75 0 01.75-.75zM12 14a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75A.75.75 0 0112 14zm11-9.25a.75.75 0 00-.75-.75h-6.75a.75.75 0 000 1.5h6.75a.75.75 0 00.75-.75zM5.5 20.25a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0v.75zm5-5a.75.75 0 000-1.5h-5a.75.75 0 000 1.5h5zm12 1.5a.75.75 0 00-.75-.75h-6.75a.75.75 0 000 1.5h6.75a.75.75 0 00.75-.75zm-7.25-7.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75 7.5a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75z" clipRule="evenodd" />
                </svg>
            );
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-700';
            break;
    }

    return (
        <div className={`p-4 rounded-md ${bgColor} ${textColor}`}>
            {icon}
            <p>{message}</p>
        </div>
    );
};

export default AlertMessage;
