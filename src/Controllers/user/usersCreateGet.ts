import type { Request, Response } from "express";

const usersCreateGet = (req: Request, res: Response) => {
  res.render("createUser", {
    title: "Create user",
  });
};

export default usersCreateGet;
