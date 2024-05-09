import react from 'react'

import PrimaryButton from './PrimaryButton';


function Hero(){

    return(
     <>
    <section className="bg-vermilion-500 text-gray-100">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leadi sm:text-6xl  whitespace-nowrap   pr-5 text-5xl text-white ">Welcome to <br/> Biz Alert
			</h1>
			
			
			<p className="mt-6 mb-8 text-lg:text-right sm:mb-12">
			Effortless Alerts for Providers: Seamlessly send Auto Remainder alerts, schedule upcoming Birthday Cake deliveries, plan Mechanic services, and book Car Wash Appointments. Stay connected and enhance customer experiences effortlessly!
			</p>

			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <PrimaryButton children={"Getting Started"} />
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			
		</div>
	</div>
    </section>
    </>
    );
}
export default Hero;


