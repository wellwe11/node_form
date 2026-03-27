import { body, type ValidationChain } from "express-validator";
import usersStorage from "../../Storages/usersStorage.js";

const alphaErr = "Must only container letters.";
const legnthErr = "Must be between 1 and 10 characters.";
const emailErr = "Must by of type email.";
const emailInUse = "Email is already in use.";
const ageErr = "Format must be 'DD/MM/yyyy'";

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
    .custom(async (email) => {
      // const existingUser = await usersStorage.getUserByEmail(email);
      // if (existingUser) {
      //   throw new Error(emailInUse);
      // }
      // If I update user, this throws error because it finds a mathcing email. Need to fix
    }),
  body("age").optional({ values: "falsy" }).isInt({ min: 0, max: 99 }),
  body("bio").optional({ values: "falsy" }).isLength({ min: 1, max: 200 }),
];
