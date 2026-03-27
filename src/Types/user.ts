export type userId = number;

export type userName = string;
export type userEmail = string;

export interface User {
  id: userId;
  firstName: userName;
  lastName: userName;
  email: userEmail;
}
