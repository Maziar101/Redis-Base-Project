import { getUser } from "../../db.js";
import client from "../../redis.js";
import { getCache, setCache } from "../../utils/handleCache.js";

export const getUserCn = async (req, res, next) => {
  const id = req.params.id;
  const userKey = `user:${id}`;
  const userCache = getCache(userKey);
  if (userCache) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(userCache),
    });
  }
  const user = await getUser(id);
  setCache(userKey, 400, user);
  return res.status(200).json({
    status: "success",
    source: "database",
    data: user,
  });
};
