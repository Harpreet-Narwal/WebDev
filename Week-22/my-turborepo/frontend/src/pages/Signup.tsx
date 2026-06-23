import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";


export function Signup(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function signup(){
        axios.post(`${BACKEND_URL}/api/v1/signup`)
    }

    return <div className="min-h-screen min-w-screen flex">
        <div className="flex-1 min-h-screen bg-black">

        </div>
        <div className="flex-1 ">
            <div className="h-full flex items-center justify-center">
                <Card className="p-6">
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}>
                    
                    </Input>
                    <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}>
                    
                    </Input>
                    <Button variant={"outline"} onClick={() =>{
                        signup
                    }}>
                        Sign up
                    </Button>
                </Card>
            </div>
        </div>
    </div>
}