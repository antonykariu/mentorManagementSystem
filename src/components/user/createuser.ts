import { PrismaClient, Prisma, User } from "@prisma/client";
import { hash } from "bcrypt";

const client = new PrismaClient();

export const createUserEmailPassword = async (user: User) => {
  /**
   * @param user
   */

  try {
    await client.$connect();
    const hashedPwd = await hash(user.password, 10);
    user.password = hashedPwd;
    const result = await client.user.create({ data: user });
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      /**
       * Unique constraint violation
       */
      if (error.code === "P2002") {
        const code = error.code;
        return { message: "Email exists", code };
      }
    } else {
      return error
    }
  } finally {
    await client.$disconnect();
  }
};
