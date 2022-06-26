import React from 'react';

const TicketsCard = ({counter}) => {

    return (
        <div className="col s12 m4">
        <div className="card white dashboard-card z-depth-3">
          <div className="card-content black-text">
            <span className="card-title">Tickets</span>
            <ul>
                <li><b>Tickets Vendidos:</b> {counter}</li>
            </ul>
          </div>
        </div>
      </div>
     );
}

export default TicketsCard;