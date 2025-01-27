import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login(email, password);
      onLogin(); // Actualiza el estado de autenticación
      navigate("/user-management"); // Redirige a la gestión de usuarios
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
        <button type="button" onClick={() => navigate("/register")}>
          Register here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;