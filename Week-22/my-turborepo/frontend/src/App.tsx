import { BrowserRouter, Route, Routes } from "react-router";
import { Appbar } from "./components/ui/Appbar";
import { Button } from "./components/ui/button";
import "./index.css";
import { Signin } from "./pages/Signin";
import { Landing } from "./pages/Landing";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { VideoCreator } from "./pages/VideoCreator";


export function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar></Appbar>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/video-creator" element={<VideoCreator/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
