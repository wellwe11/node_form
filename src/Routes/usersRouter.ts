import { Router } from "express";

import usersCreatePost from "../Controllers/user/addUser.js";
import usersListGet from "../Controllers/user/usersListGet.js";
import usersCreateGet from "../Controllers/user/usersCreateGet.js";
import {
  usersUpdateGet,
  usersUpdatePost,
} from "../Controllers/user/updateUser.js";
import usersDeletePost from "../Controllers/user/usersDeletePost.js";
import usersCreateSearch from "../Controllers/user/usersCreateSearch.js";

const userRouter = Router();

// Get all users
userRouter.get("/", usersListGet);

// Add user => post user
userRouter.get("/create", usersCreateGet);
userRouter.post("/create", usersCreatePost);

// Search for user. If user is found, it will redirect it to /:id/update
userRouter.get("/search", usersCreateSearch);

// Configure specific user
userRouter.get("/:id/update", usersUpdateGet);
userRouter.post("/:id/update", usersUpdatePost);

// Delete user
userRouter.post("/:id/delete", usersDeletePost);

export default userRouter;
