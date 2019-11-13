import React from "react";
import { Link } from 'react-navi'
import Search from "../../modules/places/search/Search";
const Header:React.FC = () => {
  return (
    <>
     <header className="flex px-2 py-3 justify-between items-center sm:px-4">
        <Link href={''} className="font-semibold text-blue-800 text-lg sm:text-xl">Places App</Link>
        <Search/>
      </header>
    </>
  );
};

export { Header }; 

export default Header;