import { prisma } from "@/lib/prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { faker } from "@faker-js/faker";
import colors from "tailwindcss/colors";
import { NextResponse } from "next/server";
import routes, { baseUrl } from "@/config/routes";

// This route will run every time a user signs up or signs in
export default async function GET() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Something went wrong with authentication" + user);
  }

  // Check if the user exists in the database

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // If the user is not found, we will create a new user

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        displayName:
          user.username ?? user.given_name ?? faker.internet.userName(),
        color: faker.helpers.arrayElement([
          colors.emerald["500"],
          colors.yellow["500"],
          colors.green["500"],
          colors.pink["500"],
          colors.purple["500"],
          colors.red["500"],
          colors.amber["500"],
        ]),
      },
    });
  }

  // Redirect user to dashboard
  return NextResponse.redirect(`${baseUrl}${routes.dashboard}`);
}
