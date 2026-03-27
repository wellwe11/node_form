import type { Request, Response } from "express";
import usersStorage from "../../Storages/usersStorage.js";

const usersListGet = (req: Request, res: Response) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

export default usersListGet;
