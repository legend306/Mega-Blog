import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-2 pl-1 text-gray-300 font-medium' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-600 focus:border-blue-500 w-full autofill-dark ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input