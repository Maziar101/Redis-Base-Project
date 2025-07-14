import express from "express";
import userRouter from "./User/Routes/index.js";
import orderRouter from "./Order/Routes/index.js";

const app = express();
const port = 5000;

app.use(`/user`,userRouter);
app.use("/order",orderRouter);

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

export default app;