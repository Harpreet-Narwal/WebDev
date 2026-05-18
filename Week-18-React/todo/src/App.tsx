import { useState } from 'react'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       Hi there
//     <br/>
//     Hello 
//     <button onClick={() => setCount(count+1)}>click me</button>
//     {count}
//     <br/>

//       <div>
//         <input placeholder='todo'></input>
//         <button>Add todo</button>
//       </div>
      
//       <Post/>

//     </div>
//   )
// } 

function App(){
  // Valid type script
  // await axios.get : down...
  const posts = [{
      name: "harkirat",
      content: "Hi there"
    }, {
      name: "raman",
      content: "Hi I just moved to canada"
    }, {
      name: "Raj", 
      content: "I do content creation"
    }];


  // let postsComponent = posts.map(p => <Post name={p.name} content={p.content} />)
  
  // [
  //   <Post name={response.posts[0].name} content={response.posts[0].content}></Post>,
  //   <Post name={response.posts[1].name} content={response.posts[1].content}></Post>
  // ]

  return <>
    <div>
      <h1>LinkedIn</h1>
      <Post name="Hakirat" content="I am a youtuber now"/>
      <Post name="Harpreet" content="Hi I started doing robotics now"/>
      <Post name="Raman" content="I got a job today"/>
      
      {posts.map(p => <Post name={p.name} content={p.content}></Post>)}

    </div>
  </>
}

export default App


// Components: they are the building blocks of the user interface...
function Post(props){
  return <div style={{backgroundColor: "grey", fontSize: 20, border: "2px black solid", borderRadius:20, margin:20, padding: 20}}>
    <div>
    <b>{props.name}</b>
    </div>

    <div>
      {props.content}
    </div>
  </div>
}

function sumUntil(n: number){
  let ans = 0;
  for(let i=0; i<n; i++){
    ans+=i;
  }
  return ans;
}
