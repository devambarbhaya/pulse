import "server-only";
import { cache } from "react";
import { Event, User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { eventDetail } from "../prisma/validators/eventValidators";

type Params = {
  ownerId: User["id"];
  eventSlug: Event["slug"];
};

export const getEventDetail = cache(async ({ eventSlug, ownerId }: Params) => {
  return await prisma.event.findUnique({
    where: {
      slug_ownerId: {
        ownerId,
        slug: eventSlug,
      },
    },
    ...eventDetail,
  });
});
