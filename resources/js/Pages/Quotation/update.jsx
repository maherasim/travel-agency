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
        airline_name: client.airline_name,
        departure_time: client.departure_time,
        arrival_time: client.arrival_time,
        ourcost: client.ourcost,
        name: client.name,
        departure_date: client.departure_date,
        flight_number: client.flight_number,
        flight_gate: client.flight_gate,
        fare_type: client.fare_type,
        prf: client.prf,
        gate: client.gate,
        class: client.class,
        total_cost: client.total_cost,
        flight_class: client.flight_class,
        pnr_number: client.pnr_number,
        seat_number: client.seat_number,
    });
 
    const submit = (e) => {
        e.preventDefault();
        const formData = {
            id: client.id,
            airline_name: data.airline_name,
            departure_time: data.departure_time,
            arrival_time: data.arrival_time,
            ourcost: data.ourcost,
            name: data.name,
            departure_date: data.departure_date,
            flight_number: data.flight_number,
            flight_gate: data.flight_gate,
            fare_type: data.fare_type,
            prf: data.prf,
            gate: data.gate,
            class: data.class,
            total_cost: data.total_cost,
            flight_class: data.flight_class,
            pnr_number: data.pnr_number,
            seat_number: data.seat_number,
            // Include other fields here
        };
        post(route('quotation.update', {id: client.id}), formData); // Pass the quotation ID in the route
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
                    <InputLabel htmlFor="name" value=" Flight Name" />

                    <TextInput
                        id="airline_name"
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.airline_name}
                        onChange={(e) => setData('airline_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="airline_name"
                    />

                    <InputError className="mt-2" message={errors.airline_name} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="departure_time" value="Departure Time" />

                    <TextInput
                        id="departure_time"
                        className=" bg-pink-200 mt-1 block w-full"
                        type="time"
                        value={data.departure_time}
                        onChange={(e) => setData('departure_time', e.target.value)}
                        required
                        isFocused
                        autoComplete="departure_time"
                    />

                    <InputError className="mt-2" message={errors.departure_time} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="arrival_time" value="Arrival Time" />

                    <TextInput
                        id="arrival_time"
                        className=" bg-pink-200 mt-1 block w-full"
type="time"
                        value={data.arrival_time}
                        onChange={(e) => setData('arrival_time', e.target.value)}
                        required
                        isFocused
                        autoComplete="arrival_time"
                    />

                    <InputError className="mt-2" message={errors.arrival_time} />
                </div>  </div>
                <div className="grid grid-cols-3 gap-4">

                <div className="mt-4">
                    <InputLabel htmlFor="ourcost" value="Our Cost" />

                    <TextInput
                        id="ourcost"
                        className=" bg-pink-200 mt-1 block w-full"
type="number"
                        value={data.ourcost}
                        onChange={(e) => setData('ourcost', e.target.value)}
                        required
                        isFocused
                        autoComplete="ourcost"
                    />

                    <InputError className="mt-2" message={errors.ourcost} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="prf" value="PRF" />

                    <TextInput
                        id="prf"
                        className=" bg-pink-200 mt-1 block w-full"
type="number"
                        value={data.prf}
                        onChange={(e) => setData('prf', e.target.value)}
                        required
                        isFocused
                        autoComplete="prf"
                    />

                    <InputError className="mt-2" message={errors. prf} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="total_cost" value="total_cost" />

                    <TextInput
                        id="total_cost"
                        className=" bg-pink-200 mt-1 block w-full"
type="number"
                        value={data.total_cost}
                        onChange={(e) => setData('total_cost', e.target.value)}
                        required
                        isFocused
                        autoComplete="total_cost"
                    />

                    <InputError className="mt-2" message={errors.total_cost} />
                </div></div>
                <div className="grid grid-cols-3 gap-4">

                <div className="mt-4">
                    <InputLabel htmlFor="departure_date" value="Departure Date" />

                    <TextInput
                        id="departure_date"
                        className=" bg-pink-200 mt-1 block w-full"
                        type="date"
                        value={data.departure_date}
                        onChange={(e) => setData('departure_date', e.target.value)}
                        required
                        isFocused
                        autoComplete="departure_date"
                    />

                    <InputError className="mt-2" message={errors.departure_date} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="flight_number" value="Flight Number" />

                    <TextInput
                        id="flight_number"
                        
                        className=" bg-pink-200 mt-1 block w-full"

                        value={data.flight_number}
                        onChange={(e) => setData('flight_number', e.target.value)}
                        required
                        autoComplete="flight_number"
                    />

                    <InputError className="mt-2" message={errors.flight_number} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fare_type" value="Fare Type" />

                    <TextInput
                        id="fare_type"
                        
                        className=" bg-pink-200 mt-1 block w-full"
                        
                        value={data.fare_type}
                        onChange={(e) => setData('fare_type', e.target.value)}
                        required
                        autoComplete="tel"
                    />
                    <InputError className="mt-2" message={errors.fare_type} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="gate" value="Gate" />

                    <TextInput
                       id="gate"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.gate}
                       onChange={(e) => setData('gate', e.target.value)}
                       required
                       autoComplete="gate"
                    />
                    <InputError className="mt-2" message={errors.gate} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="class" value="Class" />

                    <TextInput
                       id="class"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.class}
                       onChange={(e) => setData('class', e.target.value)}
                       required
                       autoComplete="class"
                    />
                    <InputError className="mt-2" message={errors.class} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="pnr_number" value="Pnr Number" />

                    <TextInput
                       id="pnr_number"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.pnr_number}
                       onChange={(e) => setData('pnr_number', e.target.value)}
                       required
                       autoComplete="pnr_number"
                    />
                    <InputError className="mt-2" message={errors.seat_number} />
                </div>
                {/* <div className="mt-4">
                    <InputLabel htmlFor="seat_number" value="Pnr Number" />

                    <TextInput
                       id="seat_number"
                        
                       className=" bg-pink-200 mt-1 block w-full"

                       value={data.seat_number}
                       onChange={(e) => setData('seat_number', e.target.value)}
                       required
                       autoComplete="seat_number"
                    />
                    <InputError className="mt-2" message={errors.seat_number} />
                </div> */}
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
        <p className="text-sm text-green-600">Qoutation updated   Successfully.</p>
    </Transition>
</div>

            </form>
            </div>  
        </Authenticated>
    );
}
