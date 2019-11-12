import React from "react";
const PlaceHolder = props => {
  return (
    <div className="flex-1 min-h-full bg-cover bg-gray-300 rounded-sm bg-center flex">
      <div className="noImage m-auto text-gray-600">
        {props.children}
        <div className={` ${props.loader ? "block" : "hidden"}`}>
          <div className={`lds-default`}>
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
      </div>
    </div>
  );
};
export default PlaceHolder;
