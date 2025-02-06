import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import { stagingSeed } from './seed-staging';

const options: { [name: string]: { type: 'string' | 'boolean' } } = {
  environment: { type: 'string' },
};

const prisma = new PrismaClient();
async function main() {
  const {
    values: { environment },
  } = parseArgs({ options });
  switch (environment) {
    case 'staging':
      // Staging setup should have realistic looking data preloaded
      stagingSeed(prisma);
      break;
    default:
      // by default we don't seed any data
      break;
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
