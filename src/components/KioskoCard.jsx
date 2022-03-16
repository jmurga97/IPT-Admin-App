import React from 'react';

const KioskoCard = () => {
    return (
        <div className="col s12 m4">
        <div className="card white dashboard-card z-depth-3">
          <div className="card-content black-text">
            <span className="card-title">Kiosko Info</span>
            <ul>
                <li>Mostrar info acerca del kiosko</li>
            </ul>
          </div>
          {/* <div className="card-action">
            <a href="#">Call to action para feature nuevo</a>
          </div> */}
        </div>
      </div>
     );
}

export default KioskoCard;