import type { Request, Response, RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";

import { validateSearch } from "./usersController.js";
import usersStorage from "../../Storages/usersStorage.js";

const searchUsers: RequestHandler[] = [
  ...validateSearch,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("All Errors:", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).render("searchUser", {
        title: "Error searching user",
        errors: errors.array(),
        user: null,
      });
    }

    const { name, email } = matchedData(req);
    const user = usersStorage.findUser(email, name);

    if (!user) {
      return res.status(400).render("searchUser", {
        title: "User not found",
        errors: errors.array(),
        user: null,
      });
    }

    return res.render("searchUser", {
      title: "Found user",
      user,
    });
  },
];

export default searchUsers;
