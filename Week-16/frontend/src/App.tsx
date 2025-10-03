import { useEffect, useRef, useState } from 'react'
import './App.css'


//dumb fashion
function App() {
  const [socket, setSocket] = useState<any>();
  const inputRef = useRef<any>(null);

  function sendMessage(){
    if(!socket){
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  }

  useEffect(() =>{

    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws);
    
    ws.onmessage = (event) =>{
      alert(event.data)
    }


    ws.onerror = () => {

    }

    ws.close = () =>{

    }
    ws.onopen = () =>{

    }

  }, [])

  return (
    <>
    <input type='text' ref={inputRef} placeholder='Message'></input>
    <button onClick={sendMessage}>Send</button>
      hi there
    </>
  )
}

export default App
