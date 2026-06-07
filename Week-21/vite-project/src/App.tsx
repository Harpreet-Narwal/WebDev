import { useRef, useState } from 'react'

import './App.css'
import { useTodos } from './hooks/useTodos';

function App() {

  const [secondPassed, setSecondsPassed] = useState(0);
  const intervalRef = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);

  function startClock(){
    if(intervalRef.current !== null) return;
    intervalRef.current = setInterval(() =>{
      setSecondsPassed( s => s+1);
    }, 1000)
  }

  function stopClock(){
    if(intervalRef.current !== null){
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function onTop(){
    if(divRef.current){
      divRef.current.scrollTo({top: 0, behavior: "smooth"});
    }
  }


/*   return (
    <div ref={divRef} style={{overflowY:'auto', height: "100vh"}}>Hi there
    <div style={{display:"flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
      <div style={{fontSize: 100}}>
        <div >
          {secondPassed}s
        </div>
        <div style={{display: "flex", justifyContent:"space-evenly"}}>
          <button onClick={startClock}>Start Clock</button>
          <button onClick={stopClock}>StopClock</button>
        </div>
      </div>
      <button onClick={onTop}>Take me to top</button>
    </div>
    </div>
  ) */

    // Custom Hooks:

    const {todos, setTodos} = useTodos()
    
    return (
      <div ref={divRef} style={{ overflowY: "auto", height: "100vh" }}>
        {todos.map(t => <Todo title={t.title} id={t.id} setTodos={setTodos}></Todo>)}
        <button onClick={onTop}>Click me to go to top</button>
      </div>
    )
}

type TodoType = {title: string, id: string, setTodos:any}

function Todo({title, id, setTodos}: TodoType){

      return <div style={{padding: 20, margin: 20, border: "2px solid black"}}>
      <div>
      {title}
    </div>
  
    <button onClick={() => {
      setTodos(todos => todos.filter(x => x.id !== id))
    }}>Delete</button>
  </div>

}


export default App
