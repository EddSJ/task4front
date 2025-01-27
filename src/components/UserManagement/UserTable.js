import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import api from "../../services/api"; // Importa el servicio correctamente

const UserTable = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers(); // Usa el método `getUsers` del servicio
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <Toolbar
        selectedUsers={selectedUsers}
        onAction={(action) => console.log(`${action} action on`, selectedUsers)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((u) => u.id) : []
                    )
                  }
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      setSelectedUsers((prev) =>
                        e.target.checked
                          ? [...prev, user.id]
                          : prev.filter((id) => id !== user.id)
                      );
                    }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="d-grid mt-3">
        <button onClick={onLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserTable;