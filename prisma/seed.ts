import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const vehicles = [
    {
      make: "Range Rover",
      model: "Vogue",
      year: 2021,
      price: 14500000,
      mileage: 12000,
      fuelType: "Diesel",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "3.0L",
      location: "Nairobi",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["Leather Seats", "Sunroof", "Navigation System"],
    },
    {
      make: "Mercedes-Benz",
      model: "GLE 350",
      year: 2020,
      price: 10800000,
      mileage: 25000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "2.0L",
      location: "Mombasa",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["Premium Sound System", "Blind Spot Monitor"],
    },
    {
      make: "Toyota",
      model: "Land Cruiser 300",
      year: 2022,
      price: 19500000,
      mileage: 5000,
      fuelType: "Diesel",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "3.3L",
      location: "Nairobi",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["4WD", "Heated Seats", "Adaptive Cruise Control"],
    },
    {
      make: "BMW",
      model: "X5 xDrive40i",
      year: 2019,
      price: 8900000,
      mileage: 45000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "3.0L",
      location: "Nairobi",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["Panoramic Roof", "Parking Assistant"],
    },
    {
      make: "Audi",
      model: "Q7 Quattro",
      year: 2021,
      price: 11200000,
      mileage: 18000,
      fuelType: "Diesel",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "3.0L",
      location: "Nairobi",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["Virtual Cockpit", "Third Row Seating"],
    },
    {
      make: "Lexus",
      model: "LX 570",
      year: 2018,
      price: 13500000,
      mileage: 55000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      engineSize: "5.7L",
      location: "Nairobi",
      status: "Available",
      images: ["/hero-car.png"],
      features: ["Mark Levinson Audio", "Luxury Package"],
    },
  ];

  console.log("Cleaning up database...");
  await prisma.vehicle.deleteMany();

  console.log("Seeding vehicles...");
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: {
        ...vehicle,
        images: JSON.stringify(vehicle.images),
        features: JSON.stringify(vehicle.features),
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
