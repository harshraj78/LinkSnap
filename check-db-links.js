const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const links = await prisma.link.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    })
    console.log('Recent Links:', JSON.stringify(links, null, 2))

    const users = await prisma.user.findMany()
    console.log('Users:', JSON.stringify(users.map(u => ({ id: u.id, email: u.email })), null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
