import { useNavigate } from "react-router";
import { Button } from "./button";

export function Appbar() {
  const navigate = useNavigate();

    return (
      <div className="flex justify-between w-full bg-gray-900 p-4">
        <div className=" w-screen text-red-300 rounded-md shadow-xl items-center p-2" onClick={() =>{
          navigate("/")
        }}>
          Higgsfield
        </div>
        <div className="flex items-center p-2">
          <Button className="bg-red-300" onClick={() => {
            navigate("/signin")
          }}>Sign in</Button>
          <Button className="bg-red-300 mx-2" onClick={() =>{
            navigate("/signup")
          }}>Sign up</Button>
        </div>
      </div>
    );
  }
  