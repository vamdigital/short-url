import db from './prisma';

async function seed() {
  const alice = await db.user.upsert({
    where: { email: '5YUeh@example.com' },
    update: {},
    create: {
      email: 'alice@alice.com',
      password: 'alicealice',
      urls: {
        create: {
          originalUrl: 'https://www.alice.io',
          shortenedUrl: 'https://bit.alice',
        },
      },
    },
  });
  const bob = await db.user.upsert({
    where: { email: '5YUeh@example.com' },
    update: {},
    create: {
      email: 'bob@bob.com',
      password: 'bobbob',
      urls: {
        create: {
          originalUrl: 'https://www.bob.io',
          shortenedUrl: 'https://bit.bob',
        },
      },
    },
  });

  const aliceUrl = await db.shortUrls.create({
    data: {
      originalUrl: 'https://www.new-alice.io',
      shortenedUrl: 'https://bit.alice.new',
      userId: alice.id,
    },
  });

  return { alice, bob, aliceUrl };
}

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
