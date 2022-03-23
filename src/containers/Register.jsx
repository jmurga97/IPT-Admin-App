import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import M from 'materialize-css'
import "../styles/Register.css";
import Loader from "../components/Loader";

const Register = () => {
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false)
  const errorMsg = useRef(null)
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { initialState } = useContext(AppContext);

  const onRegisterUser = (e) => {
    e.preventDefault();
    setLoader(true)
    const formData = new FormData(formRef.current);
    const user = {
      userId: formData.get("cedula"),
      name: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      sector: formData.get("sector"),
      phone: formData.get("phone"),
      ssidConnection: formData.get("ssidConnection"),
    };

    //handleAddUser retorna una promesa ya que es una async func que devuelve un mensaje en caso que el usuario ya exista
    initialState.handleAddUser(user).then((msg) => {
      if (!msg) {
        setError(null);
        setLoader(true)
        M.toast({html: 'Usuario creado con éxito'})
        navigate("/");
      } else {
        setError(msg);
        errorMsg.current.scrollIntoView()
      }
    });
  };
  //console.log(error);
  return (
    <div className="ipt-background">
      <div className="container register-container">
        {error && (
            <div className="row" ref={errorMsg} >
            <div className="col  error-register s12">
              <div className="card-panel white">
                <span className="red-text">{error}
                </span>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={(e) => onRegisterUser(e)} ref={formRef}>
          <div className="card-panel white black-text">
            <div className="row">
              <div className="input-field col s6">
                <input id="first_name" name="firstName" type="text" required />
                <label htmlFor="first_name">Primer Nombre</label>
              </div>
              <div className="input-field col s6">
                <input id="last_name" name="lastName" type="text" required />
                <label htmlFor="last_name">Apellido</label>
              </div>
            </div>
          </div>
          <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="cedula" name="cedula" type="text" required />
              <label htmlFor="cedula">Cédula</label>
            </div>
          </div>
          <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="sector" name="sector" type="text" required />
              <label htmlFor="sector">Sector</label>
            </div>
          </div>
          <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="email" name="email" type="text" required />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="phone" type="tel" name="phone" required />
              <label htmlFor="phone">Teléfono</label>
            </div>
          </div>
          <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="ssid" type="tel" name="ssidConnection" required />
              <label htmlFor="ssid">WiFi al que se conecta normalmente</label>
            </div>
          </div>
          <div className="form-btn">
          <button type="submit" className="btn waves-effect waves-light">
            {" "}
            Registrar Usuario{" "}
          </button>
          {loader && <Loader container='' size='small' color='white-loader'/>}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
