import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import api from "../../services/api";

const UserTable = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);

  // Supongamos que tienes el email del usuario logueado
  const loggedInUserEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        // Filtra al usuario logueado
        const filteredUsers = data.filter(user => user.email !== loggedInUserEmail);
        setUsers(filteredUsers);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      }
    };
    fetchUsers();
  }, [loggedInUserEmail]);

  const handleAction = async (action) => {
    try {
      if (action === "block") {
        await api.blockUsers(selectedUsers);
      } else if (action === "unblock") {
        await api.unblockUsers(selectedUsers);
      } else if (action === "delete") {
        await api.deleteUsers(selectedUsers);
      }
      const updatedUsers = await api.getUsers();
      const filteredUsers = updatedUsers.filter(user => user.email !== loggedInUserEmail);
      setUsers(filteredUsers);
      setSelectedUsers([]);
    } catch (err) {
      setError(`Failed to ${action} users. Please try again.`);
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <Toolbar
        selectedUsers={selectedUsers}
        onAction={handleAction}
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
                <td>{user.last_login || "N/A"}</td>
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