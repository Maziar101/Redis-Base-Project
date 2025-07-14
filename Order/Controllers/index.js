import { getOrder } from "../../db.js";
import client from "../../redis.js";

export const getOrderCn = async (req, res, next) => {
  const id = req.params.id;
  const orderKey = `order:${id}`;
  const orderCache = await client.get(orderKey);
  if (orderCache) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(orderCache),
    });
  }
  const order = await getOrder(id);
  await client.setEx(orderKey, 300, JSON.stringify(order));
  return res.status(200).json({
    status: "success",
    source: "database",
    data: order,
  });
};
