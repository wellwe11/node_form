import { body, type ValidationChain } from "express-validator";
import usersStorage from "../../Storages/usersStorage.js";

const alphaErr = "Must only container letters.";
const legnthErr = "Must be between 1 and 10 characters.";
const emailErr = "Must by of type email.";
const emailInUse = "Email is already in use.";

export const validateUser: ValidationChain[] = [
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
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1 })
    .custom(async (email, { req }) => {
      const existingUser = await usersStorage.getUserByEmail(email);
      if (existingUser) {
        if (req.params && existingUser.id !== Number(req.params.id)) {
          throw new Error(emailInUse);
        }
      }
      return true;
    }),
  body("age").optional({ values: "falsy" }).isInt({ min: 0, max: 99 }),
  body("bio").optional({ values: "falsy" }).isLength({ min: 1, max: 200 }),
];

export const validateSearch: ValidationChain[] = [
  body("email").trim().normalizeEmail().isEmail().isLength({ min: 1 }),
  body("name").trim().isAlpha().isLength({ min: 1 }),
];
