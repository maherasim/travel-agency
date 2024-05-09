import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function ClientUpdate({auth,vendor}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: vendor.trade_name,
        id: vendor.id,
        email: vendor.email, // Remove this line
        address: vendor.address,
        contact_person_email: vendor.contact_person_email,
        contact_person_phone_number: vendor.contact_person_phone_number,
        birthdate: vendor.birthdate,
        pan_number: vendor.pan_number,
        tan_number: vendor.tan_number,
        cin_number: vendor.cin_number,
        gstin_number: vendor.gstin_number,
        vendor_type: vendor.vendor_type,
        phone_number:vendor.phone_number,
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
        'gstin_number':data.gstin_number,
        'cin_number':data.cin_number,
        'tan_number':data.tan_number,
        'vendor_type':data.vendor_type,
      
        'phone_number':data.phone_number
        }
        e.preventDefault();

        post(route('vendor.update.store'));
    };

    return (
        <Authenticated  user={auth.user} >
            <div className='container-sm mx-auto p-4 m-5 '>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update Client Information.
                </p>
            </header>
        
            <form onSubmit={submit} className="mt-6 space-y-6 text-black">
            <div className="grid grid-cols-3 gap-4">
                <div>
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
                <div>
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
                <div>
                    <InputLabel htmlFor="address" value="contact_person_email" />

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
                </div>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="contact_person_phone_number" value="contact_person_phone_number" />

                    <TextInput
                        id="contact_person_phone_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.contact_person_email}
                        onChange={(e) => setData('contact_person_phone_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="contact_person_phone_number"
                    />

                    <InputError className="mt-2" message={errors.contact_person_email} />
                </div>
                <div>
                    <InputLabel htmlFor="pan_number" value="pan_number" />

                    <TextInput
                        id="pan_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.pan_number}
                        onChange={(e) => setData('pan_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="pan_number"
                    />

                    <InputError className="mt-2" message={errors.contact_person_email} />
                </div>
                <div>
                    <InputLabel htmlFor="tan_number" value="tan_number" />

                    <TextInput
                        id="tan_number"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.tan_number}
                        onChange={(e) => setData('tan_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="tan_number"
                    />

                    <InputError className="mt-2" message={errors.tan_number} />
                </div> </div>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="gstin_number" value="gstin_number" />

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
                </div>
                <div>
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

                <div>
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
                </div>

               

                <div className="flex flex-col items-center justify-center gap-4"> {/* Wrap in a flex container */}
    <div className="flex items-center gap-4"> {/* This will align the button and success message horizontally */}
        <PrimaryButton disabled={processing}>Save</PrimaryButton>
        <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
        >
            <p className="text-sm text-black-600"> Vendor Update successfully Saved.</p>
        </Transition>
    </div>
</div>

            </form>
            </div>  
        </Authenticated>
    );
}
