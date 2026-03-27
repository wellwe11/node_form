import { Router } from "express";
import {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
} from "../Controllers/usersController.js";

const userRouter = Router();

// Get all users
userRouter.get("/", usersListGet);

// Add user => post user
userRouter.get("/create", usersCreateGet);
userRouter.post("/create", usersCreatePost);

export default userRouter;
