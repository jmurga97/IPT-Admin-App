import React, { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { MdLogout, MdMenu } from "react-icons/md";
import navLogo from "../images/ipt_navbar_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/fbconfig";
import M from "materialize-css";

const SideNav = React.forwardRef(({ sideNav, onLogOut }, ref) => {
  const onCloseSideNav = () => {
    sideNav.close();
  };
  //SE PUEDE REDUCIR A OTRO COMPONENTE LOS ELEMENTOS DE NAVEGACION.
  //SOLO SE DEBE TOMAR EN CUENTA SI EL SIDENAV ESTA EN USO O NO
  return (
    <ul className="sidenav" ref={ref} id="some">
      <li onClick={() => onCloseSideNav()}>
        {" "}
        <NavLink to="/" className="black-text">
          Usuarios
        </NavLink>
      </li>
      <li onClick={() => onCloseSideNav()}>
        {" "}
        <NavLink to="/register" className="black-text">
          Registro
        </NavLink>
      </li>
      {auth.currentUser.email === "soporte@voxtel.com.ve" && (
        <li onClick={() => onCloseSideNav()}>
          <NavLink to="/tickets" className="black-text">
            Tickets
          </NavLink>
        </li>
      )}
      <li className="btn-logout center">
        {" "}
        <button
          onClick={() => onLogOut()}
          className="btn-floating waves-effect waves-light blue center"
        >
          <MdLogout className="btn-logo" />
        </button>
      </li>
    </ul>
  );
});

const Navbar = () => {
  const onLogOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const ref = useRef(null);
  const [sideNav, setSideNav] = useState();
  const logOut = useRef(onLogOut);

  const onSideNav = () => {
    sideNav.open();
  };

  useEffect(() => {
    setSideNav(M.Sidenav.init(ref.current, {}));
  }, []);

  return (
    <div className="navbar-fixed">
      <nav className="white">
        <div className="nav-wrapper black-text container">
          <NavLink to="/" className="brand-logo">
            <img src={navLogo} alt="Logo Internet Para Ti" />
          </NavLink>
          <span
            onClick={() => onSideNav()}
            className="sidenav-trigger"
            data-target="some"
          >
            <MdMenu className="btn-menu hide-on-med-and-up" size="2em" />
          </span>
          <SideNav ref={ref} sideNav={sideNav} onLogOut={logOut.current} />
          <ul className="right hide-on-med-and-down">
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
            {auth.currentUser.email === "soporte@voxtel.com.ve" && (
              <li>
                <NavLink to="/tickets" className="black-text">
                  Tickets
                </NavLink>
              </li>
            )}
            <li className="btn-logout center">
              {" "}
              <button
                onClick={() => onLogOut()}
                className="btn-floating waves-effect waves-light blue center"
              >
                <MdLogout className="btn-logo" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
