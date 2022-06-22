import React from 'react';

const MicronodesCard = ({micronodes}) => {

    return (
        <div className="col s12 m4 ">
        <div className="card white dashboard-card z-depth-3 overflow">
          <div className="card-content black-text">
            <span className="card-title">Micronodos IPT</span>
            <ul className='collection' >
                {micronodes.map((micronode) => (
                  <li key={micronode.ssid} className='collection-item'>{micronode.ssid}</li>
                ))}
            </ul>
          </div>
          {/* <div className="card-action">
            <a href="#">Call to action para feature nuevo</a>
          </div> */}
        </div>
      </div>
     );
}

export default MicronodesCard;