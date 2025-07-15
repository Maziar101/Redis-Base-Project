import { getOrder } from "../../db.js";
import client from "../../redis.js";
import { getCache, setCache } from "../../utils/handleCache.js";

export const getOrderCn = async (req, res, next) => {
  const id = req.params.id;
  const orderKey = `order:${id}`;
  const orderCache = getCache(orderKey);
  if (orderCache) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: orderCache,
    });
  }
  const order = await getOrder(id);
  setCache(orderKey, 400, order);
  return res.status(200).json({
    status: "success",
    source: "database",
    data: order,
  });
};
