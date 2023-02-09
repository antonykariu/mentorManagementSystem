import { PrismaClient, Profile } from "@prisma/client";

const client = new PrismaClient();

export const createProfile = async (profile: Profile) => {
  /**
   * @param profile
   */

  try {
    await client.$connect();
    const result = await client.profile.create({ data: profile });
    return result;
  } catch (error) {
    return error
  } finally {
    client.$disconnect();
  }
};
