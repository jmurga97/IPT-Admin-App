import React from "react";
import "../../styles/Form.css";

const Form = ({ children, btnText, onSubmitting }) => {
  return (
    <div className="login-form">
      <form onSubmit={(e) => onSubmitting(e)}>
        {children}
        <button
          type="submit"
          className="waves-effect waves-light btn center-align"
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default Form;
