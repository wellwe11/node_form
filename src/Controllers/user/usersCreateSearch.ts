import type { Request, Response } from "express";

const usersCreateSearch = (req: Request, res: Response) => {
  res.render("searchUser", {
    title: "Search User",
    user: null,
  });
};

export default usersCreateSearch;
