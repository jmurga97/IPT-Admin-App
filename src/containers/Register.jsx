import React, { useRef } from "react";
import '../styles/Register.css'

const Register = () => {
  const formRef = useRef(null)

  const onRegisterUser = () => {

  }
  return (
    <div className="ipt-background">
      <div className="container register-container">
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
              <input id="phone" type="tel" name="phone" required />
              <label htmlFor="phone">WiFi al que se conecta normalmente</label>
            </div>
          </div>
          <button type="submit" className="btn waves-effect waves-light"> Registrar Usuario </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
