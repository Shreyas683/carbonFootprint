import React, { useState } from "react";
import Web3 from "web3";
import IPFSHashStorage from "../Server/IPFSHashStorage.json"; // Adjust the import according to your project structure
import "../styles/registration.css"; // Import your styles


const RegisterFactory = () => {
  const [factoryName, setFactoryName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        throw new Error('Ethereum provider not detected');
      }

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IPFSHashStorage.networks[networkId];
      const contract = new web3.eth.Contract(
        IPFSHashStorage.abi,
        deployedNetwork && deployedNetwork.address
      );

      const hashedPassword = web3.utils.sha3(password); // Hash password
      await contract.methods.registerFactory(
        factoryName,
        location,
        industry,
        contactName,
        contactEmail,
        username,
        hashedPassword
      ).send({ from: accounts[0] });

      setRegistrationStatus("Factory registered successfully");
      setFactoryName("");
      setLocation("");
      setIndustry("");
      setContactName("");
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
          <label>Factory Name:</label>
          <input
            type="text"
            value={factoryName}
            onChange={(e) => setFactoryName(e.target.value)}
            required
          />
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label>Industry:</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
          <label>Contact Name:</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
          <label>Contact Email:</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
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
          <button type="submit" className="registerSubmit">Register</button>
        </form>
        {registrationStatus && <p>{registrationStatus}</p>}
      </div>
    </div>
  );
};

export default RegisterFactory;
