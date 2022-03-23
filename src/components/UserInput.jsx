import React from 'react';

const UserInput = ({question}) => {
    return (
        <div className="card-panel white black-text">
            <div className="input-field col s12">
              <input id="cedula" name="cedula" type="text" required />
              <label htmlFor="cedula">{question}</label>
            </div>
        </div>
    );
}

export default UserInput;