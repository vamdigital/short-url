import db from '../../prisma/prisma';

type CreateUrlProps = {
  originalUrl: string;
  shortenedUrl: string;
  user: any;
};
export async function createUrl({
  originalUrl,
  shortenedUrl,
  user,
}: CreateUrlProps) {
  try {
    await db.shortUrls.create({
      data: {
        originalUrl,
        shortenedUrl,
        userId: user.id,
      },
    });
  } catch (error) {
    return { error };
  }
}
