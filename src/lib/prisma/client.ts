import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    transactionOptions: {
      maxWait: 5000, // The maximum amount of time prisma will wait to acquire a transaction from the database (5s)
      timeout: 10000, // The maximum amount of time the interactive transaction can run before being cancelled and rolled back (10s)
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
