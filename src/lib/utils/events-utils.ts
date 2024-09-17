import routes, { baseUrl } from "@/config/routes";
import { Event } from "@prisma/client";

type Params = {
  ownerId: Event["ownerId"];
  eventSlug: Event["slug"];
};

export function getEventLink({ eventSlug, ownerId }: Params) {
  return `${baseUrl}${routes.event({ eventSlug, ownerId })}`;
}
