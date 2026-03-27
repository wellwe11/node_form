import type { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import usersStorage from "../../Storages/usersStorage.js";
import { validateUser } from "./usersController.js";

export const usersUpdateGet = (req: Request, res: Response) => {
  const user = usersStorage.getUser(Number(req.params.id));
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

export const usersUpdatePost = [
  ...validateUser,
  (req: Request, res: Response) => {
    const user = usersStorage.getUser(Number(req.params.id));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email } = matchedData(req);
    usersStorage.updateUser(Number(req.params.id), {
      firstName,
      lastName,
      email,
    });
    res.redirect("/");
  },
];
