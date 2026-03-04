interface InputProps{
    placeholder: string;
    ref ?: any;
}


export function Input({placeholder, ref}: InputProps){
    return <div>
        <input ref={ref} type="text" className="px-4 py-2 border rounded-sm m-2" placeholder={placeholder}></input>
    </div>
}