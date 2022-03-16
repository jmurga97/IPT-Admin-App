import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import M from 'materialize-css'
import "../styles/Register.css";

const Register = () => {
  const [error, setError] = useState();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { initialState, authUser } = useContext(AppContext);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Screen was focused
  //     // Do something
  //     if(!authUser){
  //         navigation.navigate('/signin')
  //     }
  //   });
  //   return unsubscribe;
  // }, [navigation,authUser]);

  const onRegisterUser = (e) => {
    e.preventDefault();
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

    initialState.handleAddUser(user).then((msg) => {
      if (!msg) {
        setError(null);
        M.toast({html: 'Usuario creado con éxito'})
        navigate("/");
      } else {
        setError(msg);
      }
    });
  };
  console.log(error);
  return (
    <div className="ipt-background">
      <div className="container register-container">
        {error && (
            <div className="row">
            <div className="col s12">
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
          <button type="submit" className="btn waves-effect waves-light">
            {" "}
            Registrar Usuario{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
