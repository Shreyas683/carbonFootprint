import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Failed to get accounts", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

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
        <div className="metamask">
          {!account ? (
            <button className="meta" onClick={connectMetaMask}>Connect to MetaMask</button>
          ) : (
            <div>
              <p>Connected account: {account}</p>
              <button onClick={disconnectMetaMask}>Disconnect</button>
              {/* Proceed with data retrieval and visualization */}
            </div>
          )}
        </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
