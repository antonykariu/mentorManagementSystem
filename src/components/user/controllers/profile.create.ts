import { PrismaClient, Profile } from "@prisma/client";
import { exists } from "../models/model.exists.js";

const client = new PrismaClient();

export async function createProfile(profile) {
  /**
   * @param profile
   */

  await client.$connect();

  const profileExists = await exists(client.profile, {
    where: {
      userId: profile.userId,
    },
  });

  return new Promise((resolve, reject) => {
    if (profileExists) {
      reject("Profile exists try updating");
    } else {
      resolve(client.profile.create({ data: profile }));
    }
  });
}
