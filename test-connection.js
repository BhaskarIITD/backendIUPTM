
import { prisma } from './src/lib/prisma.js';

async function main() {
    try {
        console.log('Testing database connection...');
        const count = await prisma.user.count();
        console.log(`Connection successful! User count: ${count}`);
    } catch (e) {
        console.error('Connection failed:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
