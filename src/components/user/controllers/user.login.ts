import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { exists } from "../models/model.exists.js";

const client = new PrismaClient();

export async function Login(user: User) {
  /**
   * @param user
   * @requires email
   * @requires password
   */

  const userExists = await exists(client.user, {
    where: {
      email: user.email,
    },
  });

  return new Promise(async (resolve, reject) => {
    if (userExists) {
      const dbUser = await client.user.findFirst({
        where: { email: user.email },
      });
      const match = await bcrypt.compare(user.password, dbUser.password);

      if (match) {
        resolve(dbUser);
      } else {
        reject("Invalid password");
      }
    } else {
      reject("User does not exist");
    }
  });
}
