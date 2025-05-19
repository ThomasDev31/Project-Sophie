import { NavLink } from "react-router";
import "../styles/header.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";


function Header() {
  const {token} = useContext(AuthContext)


  return (
    <header className="header">
      <NavLink to="/works"  className="works">
          <img src="Logo.svg" alt="logo" />
      </NavLink>
      <div className="menu"> 
          <NavLink to="/works"  className="works">Projets</NavLink>
          <NavLink  to="/contact" className="contact">Contact</NavLink>
          {!token && (
              <NavLink  to="/login" className="login">Login</NavLink>
          )}
          {token && (
              <NavLink  to="/logout" className="logout">Logout</NavLink>
          )}
         
      </div>
    </header>
  )
}

export default Header