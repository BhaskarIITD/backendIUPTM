const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);
        await prisma.$disconnect();
    } catch (e) {
        console.error('Error connecting to database:', e);
        process.exit(1);
    }
}

main();
