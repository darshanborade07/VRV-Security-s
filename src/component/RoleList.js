import React, { useEffect, useState } from "react";
import { mockApi } from "../api/mockApi";

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    mockApi.getRoles().then(setRoles);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Role Management</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border px-4 py-2">{role.name}</td>
              <td className="border px-4 py-2">{role.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
