import express from "express";
import { getUserCn } from "../Controllers/index.js";

const userRouter = express.Router();

userRouter.route("/:id").get(getUserCn);

export default userRouter;