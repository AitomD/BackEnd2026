import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criando marcas padrão
  await prisma.brand.createMany({
  data: [
    { name: "Lamborghini" },
    { name: "Ferrari" },
    { name: "Porsche" },
    { name: "McLaren" },
    { name: "Bugatti" },
    { name: "Pagani" },
    { name: "Koenigsegg" },
    { name: "Rolls-Royce" },
    { name: "Audi" },
    { name: "BMW" },
    { name: "Mercedes-Benz" }
  ],
  skipDuplicates: true
});

  // Criando um carro completo
  await prisma.car.create({
    data: {
      name: "Ferrari 488",
      model: "488 GTB",
      value: 1800000,

      brand: {
        connect: { name: "Ferrari" }
      },

      espec: {
        create: {
          year: 2021,
          fuel: "Gasolina",
          color: "Vermelho",
          transmission: "Automático",
          engine: "V8",
          potency: "670cv",
          max_speed: "330km/h"
        }
      },

      itens: {
        create: {
          airbag: true,
          alarme: true,
          banco_de_couro: true,
          controle_cruzeiro: true,
          abs: true,
          computador_bordo: true
        }
      },

      images: {
        create: [
          { url: "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997221/Ferrari2_qzdkkx.jpg" },
          { url: "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997225/Ferrari_l84qnw.jpg" },
          { url: "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997221/Ferrari3_xcvtn7.jpg"}
        ]
      }
    }
  });
}

main()
  .then(() => {
    console.log("🌱 Seed finalizado");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });