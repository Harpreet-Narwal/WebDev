import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";



async function createAvatar({name, image} : {name: string, image: string}){
    const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name, image
    })

    return response.data;
}

export function Dashboard(){
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatars, setAvatars] = useState([]);

    const mutation = useMutation({
        mutationFn: createAvatar,
        onSuccess: () =>{

        }
    })

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/avatars`)
            .then(response =>{
                setAvatars(response.data.avatars)
            })
    }, avatars)

    
    return <div>
        Dashboard Page
        <div className="w-md border rounded-md p-4 flex flex-col items-center">
            <Input placeholder="name" className="m-2" onChange={(e) => setName(e.target.value)}></Input>
            <Input placeholder="url"  className="m-2" onChange={(e) => setAvatarUrl(e.target.value)}></Input>
            <Button variant={"outline"} className="m-2 w-full " onClick={() =>{
                mutation.mutate({
                    name: name,
                    url: avatarUrl
                })
            }}>Create Avatar</Button>
        </div> 

        <div>
            <b>Avatars</b>
            {JSON.stringify(avatars)}
        </div>
    </div>
}