export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
        {...props}
        className={
            `sm:text-center px-4 py-3 bg-white  border  rounded-md font-semibold  text-vermilion-500 uppercase tracking-widest hover:bg-vermilion-500 focus:bg-vermilion-500 active:bg-vermilion-500  focus:outline-n focus:ring-2 focus:bg-white-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                disabled && 'opacity-25'
            } ` + className
        }
        disabled={disabled}      
    >
        {children}
    </button>
    
    );
}
