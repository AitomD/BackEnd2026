import prisma from "../config/database";

const formatCar = (car: any) => {
  // Função auxiliar para transformar o objeto de itens em uma lista de nomes
  const getFeaturesList = (itens: any) => {
    if (!itens) return [];
    const labels: Record<string, string> = {
      airbag: "Airbag",
      alarm: "Alarme",
      leather_seat: "Bancos de Couro",
      cruise_control: "Piloto Automático",
      abs: "Freios ABS",
      onBoard_computer: "Computador de Bordo"
    };

    // Filtra apenas as chaves que são 'true' e retorna o nome amigável
    return Object.keys(labels)
      .filter(key => itens[key] === true)
      .map(key => labels[key]);
  };

  return {
    id: car.id,
    name: car.name,
    brand: car.brand.name,
    price: Number(car.value),
    imgUrl: car.images[0]?.url || "",
    year: car.espec.year,
    specs: {
      engine: car.espec.engine,
      fuel: car.espec.fuel,
      transmission: car.espec.transmission,
    },
    // Agora 'features' será um array de strings: ["Airbag", "Alarme", ...]
    features: getFeaturesList(car.itens)
  };
};

export async function getCars() {
  const cars = await prisma.car.findMany({
    include: {
      brand: true,
      espec: true,
      images: true,
      itens: true,
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
      itens: true,
    },
  });

  if (!car) return null;

  // Reutilizamos a lógica de formatação para manter o padrão
  const formatted = formatCar(car);

  return {
    ...formatted,
    model: car.model,
    allImages: car.images.map((img: any) => img.url),
    status: car.status,
    specs: {
      ...formatted.specs,
      color: car.espec.color,
      potency: car.espec.potency,
      max_speed: car.espec.max_speed,
    }
  };
}