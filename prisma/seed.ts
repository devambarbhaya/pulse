import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import colors from "tailwindcss/colors";
import cuid from "cuid";

const prisma = new PrismaClient();
const myUserId = "kp_670e11077a2e4af4a1b96a2b62fe938c";

async function runSeed() {
  await resetDb();

  process.stdout.write("Generating users... ");
  const myUser = await prisma.user.create({
    data: {
      id: myUserId,
      displayName: "Devam Barbhaya",
      email: "barbhaya.devam@gmail.com",
      color: colors.blue["500"],
    },
  });
  const otherUsers = await prisma.user.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      id: cuid(),
      email: faker.internet.email(),
      displayName: faker.internet.displayName(),
      createdAt: faker.date.recent(),
      color: faker.helpers.arrayElement([
        colors.blue["500"],
        colors.red["500"],
        colors.green["500"],
        colors.purple["500"],
        colors.pink["500"],
        colors.yellow["500"],
        colors.emerald["500"],
      ]),
    })),
  });
  printCheckmark();

  process.stdout.write("Generating events... ");
  const event = await prisma.event.create({
    data: {
      ownerId: myUser.id,
      displayName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      slug: faker.lorem.slug(),
      createdAt: faker.date.recent(),
      participants: {
        createMany: {
          data: Array.from({ length: 10 }).map((_, index) => ({
            userId: otherUsers[index % otherUsers.length].id,
          })),
        },
      },
    },
  });
  printCheckmark();

  process.stdout.write("Generating questions... ");
  for (let i = 0; i < 30; i++) {
    await prisma.question.create({
      data: {
        eventId: event.id,
        authorId: otherUsers[i % otherUsers.length].id,
        body: faker.lorem.sentence(),
        isPinned: faker.datatype.boolean({ probability: 0.2 }),
        isResolved: faker.datatype.boolean({ probability: 0.25 }),
        createdAt: faker.date.recent(),
        upvotes: {
          createMany: {
            data: Array.from({
              length: faker.number.int({ min: 0, max: 8 }),
            }).map((_, index) => ({
              authorId: otherUsers[index % otherUsers.length].id,
            })),
          },
        },
      },
    });
  }
  printCheckmark();

  process.stdout.write("Generating polls... ");
  const polls = await prisma.poll.createManyAndReturn({
    data: [
      {
        eventId: event.id,
        body: faker.lorem.paragraph(),
        createdAt: faker.date.recent(),
        isLive: true,
      },
      {
        eventId: event.id,
        body: faker.lorem.paragraph(),
        createdAt: faker.date.recent(),
        isLive: false,
      },
    ],
  });
  const optionVotes = [
    otherUsers.slice(0, 4).map((user) => user.id), // Id of users who voted for option 1
    otherUsers.slice(4, 6).map((user) => user.id), // Id of users who voted for option 2
    otherUsers.slice(6, 10).map((user) => user.id), // Id of users who voted for option 3
    [], // No votes for option 4
  ] as const;
  for (const poll of polls) {
    // 4 options per poll
    for (let i = 0; i < 4; i++) {
      await prisma.pollOption.create({
        data: {
          pollId: poll.id,
          body: faker.lorem.word(3),
          index: i,
          votes: {
            createMany: {
              data: Array.from({ length: optionVotes[i].length }).map(
                (_, userIndex) => ({
                  authorId: optionVotes[i][userIndex],
                  pollId: poll.id,
                })
              ),
            },
          },
        },
      });
    }
  }
  printCheckmark();

  console.log("Seeding complete!");
}

async function resetDb() {
  process.stdout.write("Resetting database... ");
  await prisma.event.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();
  printCheckmark();
}

function printCheckmark() {
  process.stdout.write("\u2713\n");
}

runSeed()
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => async () => await prisma.$disconnect());
