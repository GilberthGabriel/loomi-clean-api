import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

console.log('DB_ENV', process.env.DATABASE_URI);
if (!process.env.DATABASE_URI) dotenv.config();

const prisma = new PrismaClient();
prisma.$connect().then(async () => {
  const app = (await import('./config/app')).default;
  app.listen(3000, () => console.log('server running'));
});
