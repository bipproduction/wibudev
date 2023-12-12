const { program } = require('commander');
const { execSync } = require('child_process');
const _ = require('lodash');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

; (async () => {
    program
        .option('-g, --get', 'get config')
        .option('-s, --set <boolean>', 'set config')
        .parse()

    const opt = program.opts()
    if (_.isEmpty(opt)) {
        const config = await prisma.config.findUnique({ where: { id: 1 } })
        console.log(JSON.stringify(config))
    }

    if (opt.get) {
        const config = await prisma.config.findUnique({ where: { id: 1 } })
        console.log(JSON.stringify(config))
        return
    }

    if (opt.set === "true") {
        const dev = opt.set === "true"

        const set_config = await prisma.config.upsert({
            where: { id: 1 },
            create: { dev },
            update: { dev }
        })

        console.log(JSON.stringify(set_config))
        return
    }
})()