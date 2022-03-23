import React from "react";

const Loader = ({container,color,size}) => {
  return (
      <div className={container}>
          <div className={`preloader-wrapper ${size} active`}>
      <div className={`spinner-layer ${color}`}>
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
      </div>

  );
};

export default Loader;
