import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const UserTable = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loggedInUserEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        if (err.message === "Account is blocked") {
          handleBlockedAccount()
          return;
        }
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      }
    };
    fetchUsers();
  }, [loggedInUserEmail]);

  const handleBlockedAccount = () => {
      localStorage.setItem('blockedAccount', true);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.reload();
  }

  const handleAction = async (action) => {
    try {
      const usersToActOn = selectedUsers
      let updatedRecords = null

      if (action === "block") {
        await api.blockUsers(usersToActOn);
        updatedRecords = users.map(user => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, status: "blocked" };
          }
          return user;
        });
      } else if (action === "unblock") {
        await api.unblockUsers(usersToActOn);
        updatedRecords = users.map(user => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, status: "active" };
          }
          return user;
        });
      } else if (action === "delete") {
        await api.deleteUsers(usersToActOn);
        updatedRecords = users.filter(user => !selectedUsers.includes(user.id));
      }

      setUsers(updatedRecords);
      setSelectedUsers([]);
    } catch (err) {
      if (err.message === "Account is blocked") {
        handleBlockedAccount()
        return;
      }
      setError(`Failed to ${action} users. Please try again.`);
      console.error("si esta pasando aqui ", err);
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
