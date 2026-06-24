import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";



async function createAvatar({name, url} : {name: string, url: string}){
    const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name, image: url
    })

    return response.data;
}

async function getAvatars(){
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)

    return response.data.avatars;

}

export function Dashboard(){
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatars, setAvatars] = useState([]);
    const queryClient =  useQueryClient();

    const mutation = useMutation({
        mutationFn: createAvatar,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['avatars'] })
        }
    })


/* 
    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/avatars`)
            .then(response =>{
                setAvatars(response.data.avatars)
            })
    }, [avatars]) */

    const query = useQuery({
        queryFn: getAvatars,
        queryKey: ['avatars']
    })

    
    return <div>
        Dashboard Page
        <div className="w-md border rounded-md p-4 flex flex-col items-center">
            <Input placeholder="name" className="m-2" onChange={(e) => setName(e.target.value)}></Input>
            <Input placeholder="url"  className="m-2" onChange={(e) => setAvatarUrl(e.target.value)}></Input>
            <Button variant={"outline"} className="m-2 w-full " onClick={async () =>{
                await mutation.mutateAsync({
                    name: name,
                    url: avatarUrl
                })
                

            }}>Create Avatar</Button>
        </div> 

        <div>
            <b>Avatars</b>
            {query.data.map((avatar: any) => <div> 
                {avatar.name}
            </div>)}
        </div>
    </div>
}