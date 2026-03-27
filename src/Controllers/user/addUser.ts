import type { Request, Response, RequestHandler } from "express";

import { validationResult, matchedData } from "express-validator";

import usersStorage from "../../Storages/usersStorage.js";
import { validateUser } from "./usersController.js";

const usersCreatePost: RequestHandler[] = [
  ...validateUser,
  (req: Request, res: Response) => {
    // First we validate the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    // If all checks out, add user to storage
    const { firstName, lastName, email, age, bio } = matchedData(req, {
      includeOptionals: true,
    });
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

export default usersCreatePost;
