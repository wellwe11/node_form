import type { Request, Response } from "express";
import usersStorage from "../../Storages/usersStorage.js";

const usersDeletePost = (req: Request, res: Response) => {
  usersStorage.deleteUser(Number(req.params.id));
  res.redirect("/");
};

export default usersDeletePost;
