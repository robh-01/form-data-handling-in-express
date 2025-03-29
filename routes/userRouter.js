import { Router } from "express";
import {
  userListGet,
  userCreateGet,
  userCreatePost,
  userUpdateGet,
  userUpdatePost,
  userDeletePost,
} from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/", userListGet);
userRouter.get("/create", userCreateGet);
userRouter.post("/create", userCreatePost);
userRouter.get("/:id/update", userUpdateGet);
userRouter.post("/:id/update", userUpdatePost);
userRouter.post("/:id/delete", userDeletePost);

export default userRouter;
