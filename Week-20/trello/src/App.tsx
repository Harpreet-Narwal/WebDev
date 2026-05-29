import { useState } from 'react'
// import './App.css'
import { Dashboard } from './screens/Dashboard'
import { Auth } from './screens/Auth'
import { Board } from './screens/Board'
import {BrowserRouter, Route, Routes} from "react-router"



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Auth/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/board/:boardId" element={<Board/>}></Route>
      </Routes>
    
    </BrowserRouter>
    Hi there
    </>
  )
}

export default App
