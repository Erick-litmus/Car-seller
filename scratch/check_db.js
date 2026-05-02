const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const count = await prisma.vehicle.count()
    console.log(`Total vehicles in database: ${count}`)
    const vehicles = await prisma.vehicle.findMany({ take: 5 })
    console.log('Sample vehicles:', JSON.stringify(vehicles, null, 2))
  } catch (err) {
    console.error('Database check failed:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
