import React from 'react';

const Input = React.forwardRef( ({id,name,type,label,required},ref) => {
    return (
        <div className="input-field col">
            <input
              id={id}
              name={name}
              type={type}
              className="validate"
              ref={ref}
              required = {required}
            />
            <label htmlFor={id}>{label}</label>
          </div>
     );
})

export default Input;