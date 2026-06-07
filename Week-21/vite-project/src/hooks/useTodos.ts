import { useEffect, useState } from "react";
import axios from "axios"
// custom hook


export function useTodos(){

    const [todos, setTodos] = useState([]);

    useEffect(() =>{
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                setTodos(response.data);
            })

        let interval = setInterval(() =>{
            axios.get("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                setTodos(response.data);
            })
        }, 10 * 1000);
        
        return () =>{
            clearInterval(interval)
        }
        
    }, [])

    return {todos,setTodos};
}