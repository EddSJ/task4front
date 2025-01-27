import React, { useState } from "react";
import api from "../../services/api";

const LoginForm = ({ onLogin, onSwitchToRegister  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login(email, password);
      onLogin();
    } catch (error) {
      alert("Login failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?{" "}
        <button type="button" onClick={onSwitchToRegister}>
          Register here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;