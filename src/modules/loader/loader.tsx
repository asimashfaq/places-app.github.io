import React from "react";
const Loader = props => {
  return (
    <div
      className={`absolute top-0 left-0 absolutely-center hide-loader ${
        props.loader ? "block" : "hidden"
      }`}
    >
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
