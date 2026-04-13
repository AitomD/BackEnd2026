import { PrismaClient, Prisma, FuelType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.image.deleteMany();
  await prisma.car.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.espec.deleteMany();
  await prisma.itens.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "SUV" },
      { name: "Super Esportivo" },
      { name: "Esportivo" },
      { name: "Luxo" },
    ],
    skipDuplicates: true,
  });

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

  const carros = [

    // Lamborghini
    {
      name: "Lamborghini Huracán",
      model: "Huracán EVO",
      value: 2400000,
      categoryName: "Super Esportivo",
      brandName: "Lamborghini",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Verde oliva",
        transmission: "Automático",
        engine: "V10",
        potency: "640cv",
        max_speed: "325km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774999662/lambo1_mi8aco.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774999663/lambo2_jlbwpe.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774999663/lambo3_gzsrfn.jpg"
      ]
    },

    // Ferrari
    {
      name: "Ferrari 488",
      model: "488 GTB",
      value: 1800000,
      categoryName: "Super Esportivo",
      brandName: "Ferrari",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Teal escuro",
        transmission: "Automático",
        engine: "V8",
        potency: "670cv",
        max_speed: "330km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997221/Ferrari2_qzdkkx.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997225/Ferrari_l84qnw.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1774997221/Ferrari3_xcvtn7.jpg"
      ]
    },

    // Porsche
    {
      name: "Porsche 911",
      model: "911 Carrera",
      value: 950000,
      categoryName: "Esportivo",
      brandName: "Porsche",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Azul royal",
        transmission: "Automático",
        engine: "3.0 Twin Turbo",
        potency: "385cv",
        max_speed: "293km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084333/porsche1_dnzaz5.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084330/porsche2_yfxwas.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084333/porsche3_uocgh3.jpg"
      ]
    },

    // McLaren
    {
      name: "McLaren 720S",
      model: "720S Coupe",
      value: 2800000,
      categoryName: "Super Esportivo",
      brandName: "McLaren",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Azul marinho",
        transmission: "Automático",
        engine: "4.0 V8 Twin Turbo",
        potency: "720cv",
        max_speed: "341km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084474/mclaren1_dwn0ze.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084475/mclaren2_puyeqy.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084475/mclaren3_f0lj0r.jpg"
      ]
    },

    // Bugatti
    {
      name: "Bugatti Chiron",
      model: "Chiron Sport",
      value: 18000000,
      categoryName: "Super Esportivo",
      brandName: "Bugatti",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Cinza ardósia",
        transmission: "Automático",
        engine: "8.0 W16 Quad Turbo",
        potency: "1500cv",
        max_speed: "420km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084804/buggati1_dsbpbr.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084804/buggati2_mvkecn.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775084804/buggati3_t87pe4.jpg"
      ]
    },

    // Pagani
    {
      name: "Pagani Huayra",
      model: "Huayra BC",
      value: 18000000,
      categoryName: "Super Esportivo",
      brandName: "Pagani",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Carbono Branco",
        transmission: "Automático",
        engine: "6.0 V12 Twin Turbo AMG",
        potency: "802cv",
        max_speed: "383km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085279/pagani1_fkqrgf.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085279/pagani2_fljs3l.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085279/pagani3_n3k5vb.jpg"
      ]
    },

    //Koenigsegg
    {
      name: "Koenigsegg Jesko",
      model: "Jesko Absolut",
      value: 25000000,
      categoryName: "Super Esportivo",
      brandName: "Koenigsegg",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Azul pastel",
        transmission: "Automático",
        engine: "5.0 V8 Twin Turbo",
        potency: "1600cv",
        max_speed: "531km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085459/Koenigsegg1_wocstc.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085459/Koenigsegg2_eoy34k.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085459/Koenigsegg3_xmvyuh.jpg"
      ]
    },

    //Rolls Royce
    {
      name: "Rolls-Royce Phantom",
      model: "Phantom VIII",
      value: 6000000,
      categoryName: "Luxo",
      brandName: "Rolls-Royce",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Lavanda acinzentado",
        transmission: "Automático",
        engine: "6.75 V12 Twin Turbo",
        potency: "571cv",
        max_speed: "250km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085625/roll1_liqj8x.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085626/roll2_pwgysp.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085626/roll3_xkkjiu.jpg"
      ]
    },

    //Audi
    {
      name: "Audi R8",
      model: "R8 V10 Performance",
      value: 1400000,
      categoryName: "Esportivo",
      brandName: "Audi",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Preto e vermelho race",
        transmission: "Automático",
        engine: "5.2 V10 Aspirado",
        potency: "620cv",
        max_speed: "331km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085752/audi1_lf82ns.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085752/audi2_ra2pqo.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085752/audi3_sepk1t.jpg"
      ]
    },

    //BMW
    {
      name: "BMW M4",
      model: "M4 Competition",
      value: 800000,
      categoryName: "Esportivo",
      brandName: "BMW",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Branca",
        transmission: "Automático",
        engine: "3.0 Twin Turbo",
        potency: "510cv",
        max_speed: "290km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085846/bmw1_dorovm.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085846/bmw2_f31kwj.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085846/bmw3_mmwxb3.jpg"
      ]
    },

    //Mercedes
    {
      name: "Mercedes-Benz AMG GT",
      model: "AMG GT 63 S",
      value: 1200000,
      categoryName: "Esportivo",
      brandName: "Mercedes-Benz",

      espec: {
        year: 2023,
        fuel: FuelType.Gasolina,
        color: "Verde militar",
        transmission: "Automático",
        engine: "4.0 V8 Biturbo",
        potency: "639cv",
        max_speed: "315km/h"
      },

      itens: {
        airbag: true,
        alarm: true,
        leather_seat: true,
        cruise_control: true,
        abs: true,
        onBoard_computer: true
      },

      images: [
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085958/mercedez1_xfeqoh.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085958/mercedez2_t5c9n5.jpg",
        "https://res.cloudinary.com/dchrzl7ao/image/upload/v1775085959/mercedez3_uedvhb.jpg"
      ]
    }
  ];

  // 🔁 Loop para criar todos os carros
  for (const carro of carros) {
    const espec = await prisma.espec.create({
      data: carro.espec
    });

    const itens = await prisma.itens.create({
      data: carro.itens
    });

    const brand = await prisma.brand.findUnique({
      where: { name: carro.brandName }
    });

    const category = await prisma.category.findUnique({
      where: { name: carro.categoryName } 
    });

    await prisma.car.create({
      data: {
        name: carro.name,
        model: carro.model,
        value: new Prisma.Decimal(carro.value),

        brandId: brand!.id,
        especId: espec.id,
        itensId: itens.id,
        categoryId: category?.id,

        images: {
          create: carro.images.map((url) => ({ url }))
        }
      }
    });
  }
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