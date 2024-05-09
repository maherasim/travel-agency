import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
        {...props}
        type={type}
        className={
            'border-vermilion-500 focus:border-vermilion-500 w-48 h-8 focus:ring-vermilion-500 rounded-md shadow-sm ' +
            className
        }
        ref={input}
    />
    
    );
});
