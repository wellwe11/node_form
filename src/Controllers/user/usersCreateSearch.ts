import type { Request, Response } from "express";

const usersCreateSearch = (req: Request, res: Response) => {
  res.render("searchUser", {
    title: "Search User",
  });
};

export default usersCreateSearch;
