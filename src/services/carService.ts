import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const formatCar = (car: any) => ({
  id: car.id,
  name: car.name,
  brand: car.brand.name,
  category: { 
    name: car.category?.name || "Sem Categoria"
  },
  price: Number(car.value),
  imgUrl: car.images[0]?.url || "",
  year: car.espec.year,
  specs: {
    engine: car.espec.engine,
    fuel: car.espec.fuel,
    transmission: car.espec.transmission,
  },
});

export async function getCars() {
  const cars = await prisma.car.findMany({
    include: {
      brand: true,
      espec: true,
      images: true,
      category: true,
    },
  });

  return cars.map(formatCar);
}

export async function getCarById(id: string) {
  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      brand: true,
      espec: true,
      images: true,
      itens: true, // Adicionado para pegar Airbag, ABS, etc.
    },
  });

  if (!car) return null;

  return {
    id: car.id,
    name: car.name,
    model: car.model,
    brand: car.brand.name,
    price: Number(car.value),
    imgUrl: car.images[0]?.url || "",
    allImages: car.images.map(img => img.url), // Pega todas as fotos
    year: car.espec.year,
    status: car.status,
    // Dados da ficha técnica (Espec)
    specs: {
      engine: car.espec.engine,
      fuel: car.espec.fuel,
      transmission: car.espec.transmission,
      color: car.espec.color,
      potency: car.espec.potency,
      max_speed: car.espec.max_speed,
    }
  };
}