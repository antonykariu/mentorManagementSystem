import { PrismaClient, User } from "@prisma/client";
import { exists } from "../models/model.exists.js";

const client = new PrismaClient();

export async function createUser(user: User) {
  /**
   * @param user
   */
  await client.$connect();
  const userExists = await exists(client.user, {
    where: {
      email: user.email,
    },
  });

  return new Promise((resolve, reject) => {
    if (userExists) {
      reject("User exists");
    } else {
      resolve(client.user.create({ data: user }));
    }
  });
}
