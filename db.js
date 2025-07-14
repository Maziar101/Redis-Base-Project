import { faker } from "@faker-js/faker";

export function getUser(id) {
  return new Promise((resolve, reject) => {
    resolve({
      id,
      name: faker.name.fullName(),
      phone: faker.phone.number(),
    });
  });
}

export function getOrder(id) {
  return new Promise((resolve, reject) => {
    resolve({
      id,
      user: faker.internet.username(),
      valid: Boolean(Math.random() * 10 === 2),
    });
  });
}
