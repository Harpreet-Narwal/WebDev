import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";



enum ContentType{
    Youtube = "youtube",
    Twitter = "Twitter"
}

interface CreateContentModal{
    open : boolean;
    onClose: ()=>void;
    onContentAdded: () => void;
} 

// controled content:
export function CreateContentModal({open, onClose, onContentAdded} : CreateContentModal){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
    
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onContentAdded();
        onClose();
    }

    return <div>
        { open && <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center border">
            <div className="flex flex-col justify-center">
                <div className="bg-white  rounded-md p-4">
                    <div className="flex justify-end mb-2">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon></CrossIcon>
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={"Title"}></Input>
                        <Input ref={linkRef} placeholder={"Link"}></Input>    
                    </div>
                    <div>
                        <h1>Type</h1>
                        <div className="flex justify-center my-2 gap-1">
                            <Button text={"Youtube"} variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() =>{
                                setType(ContentType.Youtube)
                            }}></Button>
                            <Button text={"Twitter"} variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter)
                            }}></Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text={"Submit"}></Button>
                    </div>
                </div>
            </div>
        </div>} 
    </div>


}

