import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: String;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading? : boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600"
}

const defaultStyles = " px-4 py-2 mr-2 rounded-md font-light flex items-center cursor-pointer " 

export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps){

    return <button onClick={onClick} disabled={loading} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""}` + " " + `${loading? " opacity-45" : ""}`} >
        {startIcon}{text}
    </button>

}
