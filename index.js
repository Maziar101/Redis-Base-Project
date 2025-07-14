import express from "express";
import userRouter from "./User/Routes/index.js";
import orderRouter from "./Order/Routes/index.js";
import client from "./redis.js";

const app = express();
const port = 5000;

const rate = 30;
const maxLimit = 5;

app.use(async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limit:${ip}`;

  const current = await client.incr(key);

  if (current === 1) {
    await client.expire(key, rate);
  }
  if (current > maxLimit) {
    return res.status(429).json({
      status: "error",
      message: "Too Many Request. Please Try Again Later.",
    });
  }
  next();
});

app.use(`/user`, userRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

export default app;
