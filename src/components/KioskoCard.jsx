import React, {useEffect, useState } from "react";

const KioskoCard = ({authedKiosko}) => {

  const [kiosko, setKiosko] = useState(null)

  useEffect(()=>{
    setKiosko(...authedKiosko)
  },[authedKiosko])

  return (
    <div className="col s12 m4">
      <div className="card white dashboard-card z-depth-3 overflow">
        <div className="card-content black-text">
          <span className="card-title">Kiosko Info</span>
          <ul>
            <li>
              <b>Nombre:</b> {kiosko && kiosko.name}
            </li>
            <li>
              <b>Correo: </b>
              {kiosko && kiosko.email}
            </li>
            <li>
              <b>Encargado:</b> {kiosko && kiosko.admin}
            </li>
            <li>
              <b>Teléfono: </b>
              {kiosko && kiosko.phone}
            </li>
            <li>
              <b>Dirección: </b>
              {kiosko && kiosko.address}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KioskoCard;
