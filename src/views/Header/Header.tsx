import React from "react";
import Search from "../../modules/places/search/Search";
import { Link } from "react-router-dom";
const Header:React.FC = () => {
  return (
    <>
     <header className="flex px-2 py-3 justify-between items-center sm:px-4">
        <Link className="font-semibold text-lg sm:text-xl" to="">Places App</Link>
        <Search/>
        <button className="bg-white py-1 px-4 border border-blue-800 text-blue-800 border border-white rounded-full hover:bg-blue-800 hover:text-white hover:border-white sm:px-4">Search</button>
      </header>
    </>
  );
};

export { Header }; 

export default Header;