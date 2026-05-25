// import { APITester } from "./APITester";
// import "./index.css";

// import logo from "./logo.svg";
// import reactLogo from "./react.svg";
import axios from "axios";
import { useEffect, useState } from "react";



export function App() {

  const [tododata, setData] = useState<string[]>([]);

  useEffect(() =>{
  axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(response => {
      const titles = response.data.map(todo => todo.title);
      setData(titles);
  })
})


  return (
    <div>
      {JSON.stringify(tododata)}
    </div>
  );
}

// function LinkedInPost(){
//   return <div style={{margin: 30, padding: 20, border: "1px solid black", backgroundColor: "green"}}>
//     <div>
//       Harkirat
//     </div>
//     <div>
//       Hi I am harkirat this is mu first post on LinkedIn
//     </div>
//   </div>
// }

export default App;
