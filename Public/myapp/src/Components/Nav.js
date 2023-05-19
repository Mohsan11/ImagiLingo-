import React from "react";
import "./Nav.css";
import img from "./img/icons8-robot-48 (1).png";
const Nav = ({ homeChanger, contactChanger }) => {
  return (
    <div className="container">
      <p className="p" onClick={homeChanger}>
        Home
      </p>

      <div className="logo">
        <img src={img} alt="Logo" />
      </div>

      <p className="sticky a" onClick={contactChanger}>
        Contact
      </p>
    </div>
  );
};
export default Nav;
