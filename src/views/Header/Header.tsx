import React from "react";
import Search from "../../moduels/places/search/Search";
import { Link } from "react-router-dom";
const Header:React.FC = () => {
  return (
    <>
      <header className="flex px-4 py-3 justify-between items-center ">
        <Link className="font-semibold text-xl" to="">Places App</Link>
        <Search/>
        <button className="bg-blue-500 py-1 px-3 text-white rounded-sm hover:bg-white hover:text-blue-500">Search</button>
      </header>
    </>
  );
};

export { Header }; 

export default Header;