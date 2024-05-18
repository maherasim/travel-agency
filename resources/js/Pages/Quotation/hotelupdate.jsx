import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function ClientUpdate({auth,client}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        
        guest_name: client.guest_name,
        hotel_address: client.hotel_address,
        room_category: client.room_category,
        contact_no: client.contact_no,
        confirmation_no: client.confirmation_no,
       
    });
 
    const submit = (e) => {
        e.preventDefault();
        const formData = {
            id: client.id,           
            guest_name: data.guest_name,
            hotel_address:data.hotel_address,
            room_category:data.room_category,
            contact_no:data.contact_no,
            confirmation_no:data.confirmation_no,
            // Include other fields here
        };
        post(route('hotelquotation.update', {id: client.id}), formData); // Pass the quotation ID in the route
    };
    
    

    return (
        <Authenticated  user={auth.user} >
            <div className='container-sm mx-auto p-4 m-5 '>
            <header>
                <h2 className="text-lg font-medium text-black-700">Qoutation Data Update</h2>

                <p className="mt-1 text-md text-black-600">
                    Update Qoutation Information.
                </p>
            </header>
        
            <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
 
                
                
                <div className="mt-4">
                    <InputLabel htmlFor="guest_name" value="Guest Name" />

                    <TextInput
                       id="guest_name"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.guest_name}
                       onChange={(e) => setData('guest_name', e.target.value)}
                       required
                       autoComplete="guest_name"
                    />
                    <InputError className="mt-2" message={errors.guest_name} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="hotel_address" value="Hotel Address" />

                    <TextInput
                       id="hotel_address"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.hotel_address}
                       onChange={(e) => setData('hotel_address', e.target.value)}
                       required
                       autoComplete="hotel_address"
                    />
                    <InputError className="mt-2" message={errors.hotel_address} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="room_category" value="Room Category" />

                    <TextInput
                       id="room_category"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.room_category}
                       onChange={(e) => setData('room_category', e.target.value)}
                       required
                       autoComplete="room_category"
                    />
                    <InputError className="mt-2" message={errors.room_category} />
                </div></div>
                <div className="grid grid-cols-3 gap-4">
 
                <div className="mt-4">
                    <InputLabel htmlFor="contact_no" value="Contact No" />

                    <TextInput
                       id="contact_no"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.contact_no}
                       onChange={(e) => setData('contact_no', e.target.value)}
                       required
                       autoComplete="contact_no"
                    />
                    <InputError className="mt-2" message={errors.contact_no} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="confirmation_no" value="Confirmation No" />

                    <TextInput
                       id="confirmation_no"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.confirmation_no}
                       onChange={(e) => setData('confirmation_no', e.target.value)}
                       required
                       autoComplete="confirmation_no"
                    />
                    <InputError className="mt-2" message={errors.confirmation_no} />
                </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4"> {/* Wrap in a flex container */}
    <div className="flex justify-center gap-4"> {/* This will center the button horizontally */}
        <PrimaryButton disabled={processing}>Update</PrimaryButton>
    </div>
    <Transition
        show={recentlySuccessful}
        enter="transition ease-in-out"
        enterFrom="opacity-0"
        leave="transition ease-in-out"
        leaveTo="opacity-0"
    >
        <p className="text-sm text-green-600">Qoutation updated   Successfully.</p>
    </Transition>
</div>

            </form>
            </div>  
        </Authenticated>
    );
}
