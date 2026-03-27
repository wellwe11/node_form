export type userId = number;

export type userName = string;
export type userEmail = string;
export type userAge = number | undefined;
export type userBio = string | undefined;

export interface User {
  id: userId;
  firstName: userName;
  lastName: userName;
  email: userEmail;
  age?: userAge;
  bio?: userBio;
}
