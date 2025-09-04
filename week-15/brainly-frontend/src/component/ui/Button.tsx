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
    "sm" : "py-2 px-2",
    "md" : "py-4 px-4",
    "lg" : "py-6 px-6"
}

const defaultStyles = "rounded-md flex"

export const Button = (props:ButtonProps) =>{
    
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyle[props.size]}`} >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>

}


<Button variant="primary" size="md" onClick={() => {}} text={"abcd"}/>