import React, { useState, useEffect } from "react";
import Web3 from "web3";
import FactoryRegistry from "../Server/IPFSHashStorage.json"; // Adjust the import according to your project structure
import "../styles/registration.css"; // Import your styles
import { sha256 } from "js-sha256"; // Use a hashing library

const RegisterFactory = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [factoryName, setFactoryName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);

          // Get accounts
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);

          // Instantiate the contract
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = FactoryRegistry.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            FactoryRegistry.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      }
      // If no MetaMask or similar provider is available
      else {
        console.warn("MetaMask not detected. Please install MetaMask.");
      }
    };
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!web3 || !contract || accounts.length === 0) {
      console.error("Web3, contract, or accounts not initialized.");
      return;
    }

    try {
      const hashedPassword = sha256(password);
      await contract.methods.registerFactory(
        factoryName,
        location,
        industry,
        parseInt(contactNumber, 10), // Ensure contactNumber is passed as an integer
        contactEmail,
        username,
        hashedPassword
      ).send({ from: accounts[0] });

      setRegistrationStatus("Factory registered successfully");
      setFactoryName("");
      setLocation("");
      setIndustry("");
      setContactNumber("");
      setContactEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error registering factory:", error);
      setRegistrationStatus("Error registering factory: " + error.message);
    }
  };

  return (
    <div className="register-factory-page">
      <div className="register-form-container">
        <h2>Register Factory</h2>
        <form onSubmit={handleSubmit} className="regForm">
          <label htmlFor="factoryName">Factory Name:</label>
          <input
            type="text"
            id="factoryName"
            value={factoryName}
            onChange={(e) => setFactoryName(e.target.value)}
            required
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="number"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <label htmlFor="contactEmail">Contact Email:</label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="registerSubmit">Register</button>
        </form>
        {registrationStatus && <p>{registrationStatus}</p>}
      </div>
    </div>
  );
};

export default RegisterFactory;
