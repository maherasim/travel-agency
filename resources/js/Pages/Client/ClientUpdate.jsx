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
        name: client.trade_name,
        id: client.id,
        email: client.email,
        address: client.address,
        contact_person_email: client.contact_person_email,
        contact_person_phone_number: client.contact_person_phone_number,
        birthdate: client.birthdate,
        pan: client.pan,
        gstin_number: client.gstin_number,
        website: client.website,
        password: client.password,
        tan_number: client.	tan_number,
        phone_number:client.phone_number,
    });
 
    const submit = (e) => {
        const formData = {
        'id':data.id,
        'name':data.name,
        'email':data.email,
        'address':data.address,
        'contact_person_email':data.contact_person_email,
        'contact_person_phone_number':data.contact_person_phone_number,
        'birthdate':data.birthdate,
        'password':data.password,       
        'tan_number':data.tan,
        'website':data.website,
        'gstin_number':data.gstin_number,
        'phone_number':data.phone_number
        }
        e.preventDefault();

        post(route('client.update.store'));
    };
    

    return (
        <Authenticated  user={auth.user} >
            <div className='container-sm mx-auto p-4 m-5 '>
            <header>
                <h2 className="text-lg font-medium text-black-700">Clients Data Update</h2>

                <p className="mt-1 text-md text-black-600">
                    Update Client Information.
                </p>
            </header>
        
            <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                        isFocused
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="Website" value="Website" />

                    <TextInput
                        id="Website"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.website}
                        onChange={(e) => setData('Website', e.target.value)}
                        required
                        isFocused
                        autoComplete="Website"
                    />

                    <InputError className="mt-2" message={errors.Website} />
                </div>  </div>
                <div className="grid grid-cols-3 gap-4">

                <div className="mt-4">
                    <InputLabel htmlFor="contact_person_email" value="Contact Personal Email" />

                    <TextInput
                        id="contact_person_email"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.contact_person_email}
                        onChange={(e) => setData('contact_person_email', e.target.value)}
                        required
                        isFocused
                        autoComplete="contact_person_email"
                    />

                    <InputError className="mt-2" message={errors.contact_person_email} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="tan_number" value="Tan NUmber" />

                    <TextInput
                        id="tan_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.tan_number}
                        onChange={(e) => setData('tan_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="tan_number"
                    />

                    <InputError className="mt-2" message={errors. tan_number} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="contact_person_email" value="gstin_number" />

                    <TextInput
                        id="gstin_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.gstin_number}
                        onChange={(e) => setData('gstin_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="gstin_number"
                    />

                    <InputError className="mt-2" message={errors.gstin_number} />
                </div></div>
                <div className="grid grid-cols-3 gap-4">

                <div className="mt-4">
                    <InputLabel htmlFor="contact_person_phone_number" value="Contact Person Phone Number" />

                    <TextInput
                        id="contact_person_phone_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.contact_person_phone_number}
                        onChange={(e) => setData('contact_person_phone_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="contact_person_phone_number"
                    />

                    <InputError className="mt-2" message={errors.contact_person_phone_number} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        type="tel"
                        className=" bg-pink-200 mt-1 block w-full"
                        
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        required
                        autoComplete="tel"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password " />

                    <TextInput
                        id="password"
                        type="text"
                        className=" bg-pink-200 mt-1 block w-full"
                        
                   
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="text"
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>
                </div>

               

                <div className="flex flex-col items-center justify-center gap-4"> {/* Wrap in a flex container */}
    <div className="flex justify-center gap-4"> {/* This will center the button horizontally */}
        <PrimaryButton disabled={processing}>Save</PrimaryButton>
    </div>
    <Transition
        show={recentlySuccessful}
        enter="transition ease-in-out"
        enterFrom="opacity-0"
        leave="transition ease-in-out"
        leaveTo="opacity-0"
    >
        <p className="text-sm text-green-600">Client Saved Successfully.</p>
    </Transition>
</div>

            </form>
            </div>  
        </Authenticated>
    );
}
