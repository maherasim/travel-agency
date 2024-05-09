import './bootstrap';
import '../css/app.css';
import './darkMode.js';


import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
// Initialization for ES Users
import { Select, initTE } from "tw-elements";
initTE({ Select });

 
import '@fortawesome/fontawesome-free/css/all.min.css';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
// var DataTable = require( 'datatables.net' );
// require( 'datatables.net-responsive' );
 
// let table = new DataTable('#Table', {
    
// });
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#cc3502',
          // Whether to include the default NProgress styles...
        includeCSS: true,

         // Whether the NProgress spinner will be shown...
        showSpinner: true,

    },
});
