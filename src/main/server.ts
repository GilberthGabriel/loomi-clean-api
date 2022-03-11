import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Envs from '../shared/envs';

if (!Envs.PORT) dotenv.config();

const prisma = new PrismaClient();
prisma.$connect().then(async () => {
  const app = (await import('./config/app')).default;
  app.listen(Envs.PORT, () => console.log('server running'));
});
