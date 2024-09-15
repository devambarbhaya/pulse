import "server-only";
import { cache } from "react";
import { Event } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../prisma/client";
import { eventDetail } from "../prisma/validators/eventValidators";

type Params = {
  cursor?: Event["id"];
};

export const getUserBookmarkedEvents = cache(
  async ({ cursor }: Params = {}) => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Not authenticated!");
    }

    const userWithBookmarks = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        bookmarks: {
          ...eventDetail,
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
          skip: cursor ? 1 : 0,
          ...(cursor ? { cursor: { id: cursor } } : {}),
        },
      },
    });

    if (!userWithBookmarks) {
      throw new Error("User not found!");
    }

    return userWithBookmarks.bookmarks;
  }
);
