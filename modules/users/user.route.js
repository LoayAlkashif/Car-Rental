import { Router } from "express";
import {
  signup,
  updateUser,
  deleteUser,
  allUsers,
  signin,
  spacificUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", allUsers);
userRouter.get("/:id", spacificUser);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
