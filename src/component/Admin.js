import React, { useEffect, useState } from "react";
import { mockApi } from "../api/mockApi";
import Navbar from "./Navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });

  useEffect(() => {
    mockApi.getUsers().then(setUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.id) {
      // Edit existing user
      mockApi.editUser(formData).then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      });
    } else {
      // Add new user
      mockApi.addUser(formData).then((newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      });
    }
    resetForm();
    setActiveTab("list");
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", role: "Viewer", status: "Active" });
  };

  const handleDelete = (id) => {
    mockApi.deleteUser(id).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    });
  };

  const handleEdit = (user) => {
    setFormData(user); 
    setActiveTab("add"); 
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzR4Frhsk8jPWgx0KjyKfvrz-l-XI_G5Tg0A&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6 bg-opacity-80 bg-white rounded-md shadow-lg mt-12 mx-auto max-w-6xl">
        {activeTab === "add" ? (
          <div className="flex justify-center items-start min-h-screen pt-10">
            <div className="border border-gray-300 rounded-lg p-8 shadow-lg bg-white w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">Add New User</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border p-2 rounded text-base"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="border p-2 rounded text-base"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border p-2 rounded text-base"
                >
                  {mockApi.roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="border p-2 rounded text-base"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-5 py-2 rounded text-base"
                  >
                    {formData.id ? "Update" : "Add"}
                  </button>
                  {formData.id && (
                    <button
                      onClick={resetForm}
                      className="bg-gray-500 text-white px-3 py-2 rounded text-base"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">{user.status}</td>
                    <td className="border px-4 py-2 space-x-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
