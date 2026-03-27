import { body, query, type ValidationChain, oneOf } from "express-validator";
import usersStorage from "../../Storages/usersStorage.js";

const alphaErr = "Must only container letters.";
const legnthErr = "Must be at least 1 letter long";
const emailErr = "Must by of type email.";
const emailInUse = "Email is already in use.";
const fieldErr = "At least one field has to be filled";

export const validateUser: ValidationChain[] = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1 })
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
    .withMessage(`Last name ${legnthErr}`)
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

export const validateSearch = [
  query("name")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .isAlpha()
    .withMessage(`${alphaErr}`)
    .isLength({ min: 1, max: 23 })
    .withMessage(`${legnthErr}`),

  query("email")
    .optional({ values: "falsy" })
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1 })
    .withMessage(`${legnthErr}`),

  query().custom((value, { req }) => {
    if (req.query) {
      const { name, email } = req.query;

      if (!name && !email) {
        throw new Error("Please fill at least one field.");
      }

      return true;
    }
  }),
];
