import React from "react";
import PlaceSearch from "../../moduels/searchplace/SearchPlace";
const Header:React.FC = () => {
  return (
    <>
      <header className="flex px-4 py-3 justify-between items-center ">
        <a className="font-semibold text-xl" href="#">Places App</a>
        <PlaceSearch/>
        <button className="bg-blue-500 py-1 px-3 text-white rounded-sm hover:bg-white hover:text-blue-500">Search</button>
      </header>
    </>
  );
};

export { Header }; 

export default Header;