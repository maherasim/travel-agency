// resources/js/components/Preloader.js

import React from 'react';
import { usePage } from '@inertiajs/react';

const Preloader = () => {
    const { isLoading } = usePage();

    return (
        <div className={`${isLoading ? 'preloader-show' : ''}`}>
            {/* Your preloader content */}
            {/* <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> */}
        </div>
    );
};

export default Preloader;