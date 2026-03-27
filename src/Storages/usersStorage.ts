import type {
  User,
  userAge,
  userBio,
  userEmail,
  userId,
  userName,
} from "../Types/user.js";

class UsersStorage {
  storage: Record<number, User>;
  id: userId;
  email: userEmail;
  age?: userAge;
  bio?: userBio;

  constructor() {
    this.storage = {};
    this.id = 0;
    this.email = "";
    this.age = undefined;
    this.bio = undefined;
  }

  addUser({
    firstName,
    lastName,
    email,
    age,
    bio,
  }: {
    firstName: userName;
    lastName: userName;
    email: userEmail;
    age?: userAge;
    bio?: userBio;
  }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id: userId) {
    return this.storage[id];
  }

  getUserByEmail(email: userEmail): User | undefined {
    return Object.values(this.storage).find((user) => user.email === email);
  }

  findUser(email: userEmail, name: string) {
    if (email) {
      return this.getUserByEmail(email);
    }

    if (name) {
      const splitted = name.split(" ");
      return Object.values(this.storage).find(
        (user) =>
          user.firstName === splitted[0] && user.lastName === splitted[1],
      );
    }
  }

  updateUser(
    id: userId,
    {
      firstName,
      lastName,
      email,
      age,
      bio,
    }: {
      firstName: userName;
      lastName: userName;
      email: userEmail;
      age?: number;
      bio?: string;
    },
  ) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id: userId) {
    delete this.storage[id];
  }
}

export default new UsersStorage();
