import { cloneElement } from "react";

export interface ButtonProps{
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
}

const variantStyles = {
    "primary": "bg-[#5046e4] text-white",
    "secondary": "bg-[#e0e7fe] text-[#5046e4]"  
}

const sizeStyle = {
    "sm" : "py-2 px-4 text-sm" ,
    "md" : "py-2 px-4 text-base",
    "lg" : "py-2 px-8 text-xl"
}

const defaultStyles = "rounded-md m-1"



 export const Button = (props:ButtonProps) =>{

    const sizedStartIcon = props.startIcon && cloneElement(props.startIcon, {size: props.size});
    const sizedEndIcon = props.endIcon && cloneElement(props.endIcon, {size: props.size})


    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyle[props.size]} hover: cursor-pointer`} >
            <div className="flex items-center">
                {props.startIcon ? <div className="pr-1">{sizedStartIcon}</div> : null}
                <div className="pl-2 pr-2">
                    {props.text}
                </div>
                {sizedEndIcon}
            </div>
    </button>

 }


<Button variant="primary" size="md" onClick={() => {}} text={"abcd"}/>