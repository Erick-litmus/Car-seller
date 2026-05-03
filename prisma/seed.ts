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
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
      ],
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
      images: [
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
      ],
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
      images: [
        "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=800&q=80"
      ],
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
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54c?auto=format&fit=crop&w=800&q=80"
      ],
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
      images: [
        "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80"
      ],
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
      images: [
        "https://images.unsplash.com/photo-1609521262040-572765275640?auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Mark Levinson Audio", "Luxury Package"],
    }
  ];

  console.log("Starting database seed transaction with fresh image URLs...");

  try {
    await prisma.$transaction(async (tx) => {
      console.log("Cleaning up existing vehicles...");
      await tx.vehicle.deleteMany();

      console.log(`Seeding ${vehicles.length} vehicles...`);
      for (const vehicle of vehicles) {
        await tx.vehicle.create({
          data: {
            ...vehicle,
            images: JSON.stringify(vehicle.images),
            features: JSON.stringify(vehicle.features),
          },
        });
      }
    });
    console.log("Seeding complete! Database images have been refreshed.");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
