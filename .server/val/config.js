const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
module.exports = async () => {
    const config = await prisma.config.findUnique({ where: { id: 1 } })
    return config
}