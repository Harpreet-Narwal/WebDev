import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

type Content = {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

export function useContent(){
    const [contents, setContents] = useState<Content[]>([]);

    async function refresh(){
    const response = await axios.get(`${BACKEND_URL}/api/v1/content` , {
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    })
    setContents(response.data.content)
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() =>{
            refresh()
        }, 1000 * 10);

        return () =>{
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh};
}