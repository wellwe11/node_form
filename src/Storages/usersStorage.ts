import type { User, userId, userName } from "../Types/user.js";

class UsersStorage {
  storage: Record<number, User>;
  id: userId;

  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({
    firstName,
    lastName,
  }: {
    firstName: userName;
    lastName: userName;
  }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName };
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id: userId) {
    return this.storage[id];
  }

  updateUser(
    id: userId,
    { firstName, lastName }: { firstName: userName; lastName: userName },
  ) {
    this.storage[id] = { id, firstName, lastName };
  }

  deleteUser(id: userId) {
    delete this.storage[id];
  }
}

export default new UsersStorage();
