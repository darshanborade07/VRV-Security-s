export const mockApi = {
    users: [
      { id: 1, name: "Darshan Borade", email: "admin@gmail.com", role: "Admin", status: "Active" },
      { id: 2, name: "Raj Patil", email: "raj@gmail.com", role: "Editor", status: "Inactive" },
    ],
    roles: [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "Editor", permissions: ["Read", "Write"] },
      { id: 3, name: "Viewer", permissions: ["Read"] },
    ],
    getUsers() {
      return Promise.resolve(this.users);
    },
    getRoles() {
      return Promise.resolve(this.roles);
    },
    addUser(user) {
      user.id = this.users.length + 1;
      this.users.push(user);
      return Promise.resolve(user);
    },
    editUser(updatedUser) {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      this.users[index] = updatedUser;
      return Promise.resolve(updatedUser);
    },
    deleteUser(userId) {
      this.users = this.users.filter((u) => u.id !== userId);
      return Promise.resolve(userId);
    },
  };
  