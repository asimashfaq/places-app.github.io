import React from "react";
import Search from "../../modules/places/search/Search";
import { Link } from "react-router-dom";
const Header:React.FC = () => {
  return (
    <>
     <header className="flex px-2 py-3 justify-between items-center sm:px-4">
        <Link className="font-semibold text-lg sm:text-xl" to="">Places App</Link>
        <Search/>
        <button className="bg-primary py-1 px-2 text-white rounded-sm hover:bg-white hover:text-blue-500 sm:px-3">Search</button>
      </header>
    </>
  );
};

export { Header }; 

export default Header;