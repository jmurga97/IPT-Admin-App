import React from "react";

const Select = React.forwardRef(({name, label,options,required}, ref) => {
    console.log("OPCIONES SELECT", ref)
  return (
    <div className="input-field col ">
      <select ref={ref} name={name} required = {required}>
        <option defaultValue="" disabled >-</option>
        {options.map((option) => (
            <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  );
});

export default Select;
