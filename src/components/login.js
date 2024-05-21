import React, { useState } from "react";
import "../styles/login.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Implement login logic here, considering the selected role (e.g., API call, validation)
    console.log(
      "Login attempted with username:",
      username,
      "password:",
      password,
      "role:",
      role
    );
    setUsername(""); // Clear form fields after submission (optional)
    setPassword("");
    setRole("");
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="role">Select Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            <option value="factory">Factory</option>
            <option value="regulator">Regulator</option>
            <option value="consumer">Consumer</option>
            <option value="investor">Investor</option>
          </select>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
