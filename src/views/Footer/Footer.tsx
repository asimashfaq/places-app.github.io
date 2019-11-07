import React from "react";
const Footer:React.FC = () => (
  <footer className="d-flex justify-content-center p-3">
    <div className="text-blue-800">
        &copy; {new Date().getFullYear()}, made with love
    </div>
  </footer>
);

export { Footer };

export default Footer;