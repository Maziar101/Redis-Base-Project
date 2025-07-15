import client from "../redis.js";

export const setCache = async (key, second, value) => {
  await client.setEx(key, second, JSON.stringify(value));
};

export const getCache = async (key) => {
  return await JSON.parse(client.get(key));
};

export const delCache = async (key) => {
  await client.del(key);
};