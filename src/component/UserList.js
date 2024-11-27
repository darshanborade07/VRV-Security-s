import React, { useEffect, useState } from "react";
import { mockApi } from "../api/mockApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", role: "", status: "" });

  useEffect(() => {
    mockApi.getUsers().then(setUsers);
  }, []);

  const handleDelete = (id) => {
    mockApi.deleteUser(id).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    });
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditFormData(user); // Pre-fill the form with the selected user's details.
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSave = () => {
    const updatedUser = { ...editFormData, id: editingUserId };
    mockApi.editUser(updatedUser).then((updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUserId(null); // Exit edit mode after saving.
    });
  };

  const handleEditCancel = () => {
    setEditingUserId(null); // Cancel editing and reset the form state.
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUserId === user.id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    >
                      {mockApi.roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-green-500 mr-2"
                      onClick={handleEditSave}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
