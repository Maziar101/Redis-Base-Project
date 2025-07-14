import { getUser } from "../../db.js";
import client from "../../redis.js";

export const getUserCn = async (req, res, next) => {
  const id = req.params.id;
  const userKey = `user:${id}`;
  const userCache = await client.get(userKey);
  if (userCache) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(userCache),
    });
  }
  const user = await getUser(id);
  await client.setEx(userKey, 300, JSON.stringify(user));
  return res.status(200).json({
    status: "success",
    source: "database",
    data: user,
  });
};
