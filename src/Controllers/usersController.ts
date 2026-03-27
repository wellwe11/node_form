import usersStorage from "../Storages/usersStorage.js";
import type { Request, Response, RequestHandler } from "express";

import {
  body,
  validationResult,
  matchedData,
  type ValidationChain,
} from "express-validator";

const alphaErr = "Must only container letters.";
const legnthErr = "Must be between 1 and 10 characters.";

const validateUser: ValidationChain[] = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${legnthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${legnthErr}`),
];

export const usersCreatePost: RequestHandler[] = [
  ...validateUser,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

{
}

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
