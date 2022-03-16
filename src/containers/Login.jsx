import React, { useContext, useRef } from "react";
import "../styles/Login.css";
import loginLogo from "../images/ipt_login_logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/fbconfig";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {setAuthUser} = useContext(AppContext)
  const navigate = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    try{
      const currentUser = await signInWithEmailAndPassword(auth,email,password)
      console.log(setAuthUser)
      setAuthUser(currentUser)
      navigate('/')
    }catch(err){
      console.warn(err.message)
    }
  };

  return (
    <div className="login-container ipt-background">
      <div className="login-header">
        <div className="puff-in-center">
          <img src={loginLogo} alt="Logo Internet Para Ti" />
        </div>
        <h3>IPT Admin App</h3>
        <p>Por favor, inicie sesión</p>
      </div>
      <div className="login-form">
        <form onSubmit={(e) => onLogin(e)}>
          <div className="input-field col s6">
            <input
              id="user"
              name="username"
              type="email"
              className="validate"
              ref={emailRef}
              required
            />
            <label htmlFor="user">Usuario</label>
          </div>
          <div className="input-field col s6">
            <input
              id="password"
              name="password"
              type="password"
              className="validate"
              ref={passwordRef}
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button
            type="submit"
            className="waves-effect waves-light btn center-align"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
