import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import NavBar from '@/Components/NavBar';
import Hero from '@/Components/HeroSection';
import Feature from '@/Components/Feature';
import Product  from '@/Components/Product';



  
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
       <div>       
            <Hero />
            <Feature />
            <Product />
        </div>
     
    );
}

