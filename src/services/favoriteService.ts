import prisma from "../config/database";

export async function getFavoritesByUser(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      car: {
        include: {
          brand: true,
          images: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return favorites.map((favorite) => ({
    id: favorite.car.id,
    favoriteId: favorite.id,
    carId: favorite.carId,
    name: favorite.car.name,
    brand: favorite.car.brand.name,
    imgUrl: favorite.car.images[0]?.url || "/placeholder-car.png",
    offeredValue: Number(favorite.car.value),
    message: favorite.message,
    createdAt: favorite.createdAt,
  }));
}

export async function createFavorite(
  userId: string,
  carId: string,
  message?: string,
) {
  return prisma.favorite.create({
    data: {
      userId,
      carId,
      message,
    },
  });
}

export async function deleteFavorite(userId: string, carId: string) {
  const favorite = await prisma.favorite.findFirst({
    where: { userId, carId },
  });
  if (!favorite) return null;
  return prisma.favorite.delete({ where: { id: favorite.id } });
}

export async function findFavorite(userId: string, carId: string) {
  return prisma.favorite.findFirst({ where: { userId, carId } });
}

export async function updateFavoriteMessage(
  favoriteId: string,
  userId: string,
  message: string,
) {
  const favorite = await prisma.favorite.findFirst({
    where: { id: favoriteId, userId },
  });

  if (!favorite) return null;

  return prisma.favorite.update({
    where: { id: favoriteId },
    data: { message },
  });
}