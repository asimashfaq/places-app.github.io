import React from "react";
const Footer:React.FC = () => (
  <footer className="p-3 text-center">
    <div className="text-blue-800">
        &copy; {new Date().getFullYear()}, made with love
    </div>
  </footer>
);

export { Footer };

export default Footer;