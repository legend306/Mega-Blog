import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}