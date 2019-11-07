import React from "react";
const Footer:React.FC = () => (
  <footer className="d-flex justify-content-center">
  <div className="pb-2 pt-3">
      &copy; {new Date().getFullYear()}, made with love
   </div>
  </footer>
);

export { Footer };

export default Footer;