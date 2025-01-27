import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.register(name, email, password);
      alert("Registration successful. User ID: " + response.userId);
      navigate("/login"); // Redirige al formulario de login
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button type="submit">Register</button>
      <p>
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Login here
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;