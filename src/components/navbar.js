import React from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <p>CO</p>
        <h1>2</h1>
      </div>
      <div>
        <ul className="components">
          <Link to="/" className="navComponents">
            <li>Home</li>
          </Link>
          <Link to="/contact" className="navComponents">
            <li>Contact Us</li>
          </Link>
          <Link to="/aboutUs" className="navComponents">
            <li>About Us</li>
          </Link>
          <Link to="/Login" className="navComponents">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
