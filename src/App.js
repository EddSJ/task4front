import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import UserManagement from "./components/UserManagement/UserTable";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <Navigate to="/user-management" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterForm />
              ) : (
                <Navigate to="/user-management" replace />
              )
            }
          />

          {/* Ruta protegida */}
          <Route
            path="/user-management"
            element={
              isAuthenticated ? (
                <UserManagement onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Redirigir cualquier otra ruta */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;