// scripts/test-db.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Test the connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Connection successful:', result)
    
    // Get a list of all tables (if any exist)
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('Tables:', tables)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()