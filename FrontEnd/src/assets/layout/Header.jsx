import { NavLink } from "react-router";
import "../styles/header.css";


function Header() {
   

  return (
    <header className="header">
      <img src="Logo.svg" alt="logo" />
      <div className="menu"> 
          <NavLink to="/works"  className="works">Projets</NavLink>
          <NavLink  to="/contact" className="contact">Contact</NavLink>
          <NavLink  to="/login" className="login">Login</NavLink>
          <NavLink  to="/logout" className="logout">Logout</NavLink>
      </div>
    </header>
  )
}

export default Header