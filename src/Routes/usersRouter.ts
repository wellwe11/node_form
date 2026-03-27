import { Router } from "express";

import usersCreatePost from "../Controllers/user/validateUser.js";
import usersListGet from "../Controllers/user/usersListGet.js";
import usersCreateGet from "../Controllers/user/usersCreateGet.js";
import {
  usersUpdateGet,
  usersUpdatePost,
} from "../Controllers/user/usersUpdate.js";
import usersDeletePost from "../Controllers/user/usersDeletePost.js";

const userRouter = Router();

// Get all users
userRouter.get("/", usersListGet);

// Add user => post user
userRouter.get("/create", usersCreateGet);
userRouter.post("/create", usersCreatePost);

// Configure specific user
userRouter.get("/:id/update", usersUpdateGet);
userRouter.post("/:id/update", usersUpdatePost);

// Delete user
userRouter.post("/:id/delete", usersDeletePost);

export default userRouter;
