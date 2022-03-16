import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import navLogo from "../images/ipt_navbar_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/fbconfig";

const Navbar = () => {

  const onLogOut = async () => {
    try{
      await signOut(auth)
    }catch(err){
      console.warn(err.message)
    }
  }
  return (
    <nav className="white">
      <div className="nav-wrapper black-text container">
        <NavLink to="/" className="brand-logo">
          <img src={navLogo} alt="Logo Internet Para Ti" />
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {" "}
            <NavLink to="/" className="black-text">
              Usuarios
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/register" className="black-text">
              Registro
            </NavLink>
          </li>
          <li className="btn-logout center">
            {" "}
            <button onClick={() => onLogOut()} className="btn-floating waves-effect waves-light blue center">
              <MdLogout className="btn-logo" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
