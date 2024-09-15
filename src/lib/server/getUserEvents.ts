import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import { prisma } from "../prisma/client";
import { eventDetail } from "../prisma/validators/eventValidators";
import { Event } from "@prisma/client";

type Params = {
  cursor?: Event["id"];
};

export const getUserEvents = cache(async ({ cursor }: Params = {}) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Not authenticated!");
  }

  return prisma.event.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    skip: cursor ? 1 : 0,
    ...(cursor ? { cursor: { id: cursor } } : {}),
    ...eventDetail,
  });
});
