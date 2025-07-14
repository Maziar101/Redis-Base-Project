import express from "express";
import { getOrderCn } from "../Controllers/index.js";

const orderRouter = express.Router();

orderRouter.route("/:id").get(getOrderCn);

export default orderRouter;
