import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../layout/AuthContext";
function Logout({interval = 3000}) {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
  
    useEffect(() => {
      logout();
     const timeout =  setTimeout(() => {
        navigate("/works")
      }, interval);
      return  () => clearTimeout(timeout);
    },[logout, navigate, interval])
  return (
    <>
      <div>
        <p>Vous allez être déconnecté</p>
      </div>
    </>
  )
}

export default Logout;