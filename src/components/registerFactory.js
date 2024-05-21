import React, { useState } from "react";
import "../styles/registerfactory.css";

const RegisterFactory = () => {
  const [factoryName, setFactoryName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Implement factory registration logic here (e.g., API call, validation)
    console.log(
      "Factory Registration:",
      factoryName,
      location,
      industry,
      contactName,
      contactEmail,
      username,
      password
    );

    try {
      const response = await fetch("/registerFactory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factoryName,
          location,
          industry,
          contactName,
          contactEmail,
          username,
          password,
        }),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      // Handle successful registration (optional: clear form, show success message)
      setFactoryName("");
      setLocation("");
      setIndustry("");
      setContactName("");
      setContactEmail("");
      setUsername("");
      setPassword("");
      // ... and so on
    } catch (error) {
      console.error("Error registering factory:", error);
      // Handle errors (e.g., display error message to user)
    }
  }

  return (
    <div className="register-factory-page">
      <div className="register-form-container">
        <h2>Register Factory</h2>
        <form onSubmit={handleSubmit} className="regForm" method="POST">
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
          <label htmlFor="contactName">Contact Name:</label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
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
          <button type="submit" className="registerSubmit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFactory;
