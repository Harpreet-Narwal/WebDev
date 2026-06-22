import { BrowserRouter, Route, Routes } from "react-router";
import { Appbar } from "./components/ui/Appbar";
import { Button } from "./components/ui/button";
import "./index.css";
import { Signin } from "./pages/Signin";


export function App() {
  return (
    <div>
      <Appbar></Appbar>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
