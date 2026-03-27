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
      console.log(errors);
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    // If all checks out, add user to storage
    const { firstName, lastName, email } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email });
    res.redirect("/");
  },
];

export default usersCreatePost;
