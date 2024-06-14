import React, { useState } from "react";
import Web3 from "web3";
import IPFSHashStorage from "../Server/IPFSHashStorage.json";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  // Define array for storing usernames, passwords, and roles
  const credentials = [
    { password: "m1234", username: "Manufacturer", role: "factory" },
    { password: "a1234", username: "Agriculture", role: "factory" },
    { password: "c1234", username: "Construction", role: "factory" },
    { password: "t1234", username: "Transport", role: "factory" },
    { password: "mi1234", username: "Mining", role: "factory" },
    { password: "g1234", username: "Government", role: "regulator" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ethereum provider check
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        throw new Error('Ethereum provider not detected');
      }

      // Web3 instance setup
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IPFSHashStorage.networks[networkId];
      const contract = new web3.eth.Contract(
        IPFSHashStorage.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Hash the password for solidity compatibility
      const hashedPassword = web3.utils.utf8ToHex(password);

      // Validate credentials against stored data
      const foundCredential = credentials.find(cred =>
        cred.username === username && cred.password === password
      );

      if (foundCredential && foundCredential.role === role) {
        console.log("Login successful as", role, ":", username);
        setLoginStatus("Login successful");
        // After successful login
localStorage.setItem("userRole", role); // Store the role in localStorage
navigate("/");

        // Redirect or perform actions here
      } else {
        setLoginStatus("Invalid username or password");
      }

      setUsername("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error during login:", error);
      setLoginStatus("An error occurred during login.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">-- Select Role --</option>
            <option value="factory">Factory</option>
            <option value="regulator">Government</option>
          </select>
          <button type="submit" className="loginbtn">Login</button>
          {loginStatus && <p>{loginStatus}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
