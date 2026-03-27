import type { User, userId, userName } from "../Types/user.js";

class UsersStorage {
  storage: Record<number, User>;
  id: userId;
  email: string;

  constructor() {
    this.storage = {};
    this.id = 0;
    this.email = "";
  }

  addUser({
    firstName,
    lastName,
    email,
  }: {
    firstName: userName;
    lastName: userName;
    email: string;
  }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email };
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id: userId) {
    return this.storage[id];
  }

  getUserByEmail(email: string): User | undefined {
    return Object.values(this.storage).find((user) => user.email === email);
  }

  updateUser(
    id: userId,
    {
      firstName,
      lastName,
      email,
    }: { firstName: userName; lastName: userName; email: string },
  ) {
    this.storage[id] = { id, firstName, lastName, email };
  }

  deleteUser(id: userId) {
    delete this.storage[id];
  }
}

export default new UsersStorage();
