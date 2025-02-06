import { PrismaClient } from '@prisma/client';

/**
 * @param prismaClient an instantiated prisma client so we can read/write to the db
 * @description this function is what we use to seed a staging env or a local env with starting data
 */
export const stagingSeed = async (prismaClient: PrismaClient) => {
  // this is where you would write your seeding for a staging/local environment
};
