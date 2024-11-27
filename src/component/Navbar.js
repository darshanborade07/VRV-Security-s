import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session data or tokens (if any)
    localStorage.removeItem("adminLoggedIn");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">VRV Security's</h1>
      <div className="space-x-4 flex items-center">
        <button
          className={`${
            activeTab === "add" ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => setActiveTab("add")}
        >
          Add New User
        </button>
        <button
          className={`${
            activeTab === "list" ? "font-bold underline" : ""
          } hover:underline`}
          onClick={() => setActiveTab("list")}
        >
          Show Users
        </button>
        <button
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
