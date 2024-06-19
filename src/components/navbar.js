import React, { useState, useEffect } from "react";
import logo from "../assets/logo1.png";
import metamaskIcon from "../assets/metamask-icon.png";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setErrorMessage(""); // Clear any previous error message
      } catch (error) {
        if (error.code === 4001) {
          setErrorMessage("User denied account access. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    setErrorMessage(""); // Clear any previous error message
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
      </div>
      <div>
        <ul className="components">
          <Link to="/" className="navComponents">
            <li>Home</li>
          </Link>
          {/* <Link to="/contactUs" className="navComponents">
            <li>Contact Us</li>
          </Link> */}
          <Link to="/aboutUs" className="navComponents">
            <li>User Guide</li>
          </Link>
          <Link to="/Login" className="navComponents">
            <li>Login</li>
          </Link>
          <div className="metamask">
            {!account ? (
              <div>
                <img
                  src={metamaskIcon}
                  alt="MetaMask"
                  className="metamask-icon"
                  onClick={connectMetaMask}
                  style={{ cursor: "pointer", width: "50px", height: "50px" }}
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            ) : (
              <div>
                {/* <button className="button" onClick={disconnectMetaMask}>
                  Disconnect
                </button> */}
                <button className="button-dis" onClick={disconnectMetaMask}>
                  <span className="button_lg">
                    <span className="button_sl"></span>
                    <span className="button_text">Disconnect Metamask</span>
                  </span>
                </button>
                {/* <p>Connected account: {account}</p> */}
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
