import React from 'react';
import { usePage } from '@inertiajs/react';

import Preloader from '@/Components/Preloader';

const AppLayout = ({ children }) => {
    const { isLoading } = usePage();

    return (
        <div>
            {isLoading && <Preloader />}
            {children}
        </div>
    );
};

export default AppLayout;