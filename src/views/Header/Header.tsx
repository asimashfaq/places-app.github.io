import React from "react";
import Search from "../../modules/places/search/Search";
import { Link } from "react-router-dom";
const Header:React.FC = () => {
  return (
    <>
     <header className="flex px-2 py-3 justify-between items-center sm:px-4">
        <Link className="font-semibold text-blue-800 text-lg sm:text-xl" to="">Places App</Link>
        <Search/>
      </header>
    </>
  );
};

export { Header }; 

export default Header;