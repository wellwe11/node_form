import usersStorage from "../Storages/usersStorage.js";
import type { Request, Response } from "express";

export const usersListGet = (req: Request, res: Response) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

export const usersCreateGet = (req: Request, res: Response) => {
  res.render("createUser", {
    title: "Create user",
  });
};

export const usersCreatePost = (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
};
