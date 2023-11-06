import React from "react";
import "../../styles/SimpleLayout.css";
import loginLogo from "../../images/ipt_login_logo.png";

const SimpleLayout = ({title,subtitle,children}) => {
  return (
    <div className="layout-container ipt-background">
      <div className="layout-header">
        <div className="puff-in-center">
          <img src={loginLogo} alt="Logo Internet Para Ti" />
        </div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default SimpleLayout;
