import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout({interval = 3000}) {
   const navigate = useNavigate();

    const logoutUser = () => {
      localStorage.clear();
    }
    useEffect(() => {
      logoutUser();
      setInterval(() => {
        navigate("/");

      }, interval);
      return clearInterval(setInterval);
    })
  return (
    <>
      <div>
        <p>Vous allez être déconnecté</p>
      </div>
    </>
  )
}

export default Logout;