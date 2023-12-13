const { program } = require('commander');
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const columnify = require('columnify');
const prisma = new PrismaClient();
const color = require('colors');

; (async () => {

    program
        .requiredOption('-s, --set <boolean>', 'set mode to dev or prod')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    const config = await prisma.config.findUnique({ where: { id: 1 } })
    const url_host = config.url_server
    const dev = opt.set === "true"
    const apa = execSync(`curl -s -o- -X POST -H "Content-Type: application/json" -d '{"-s": ${dev}}' POST ${url_host}/svr/config`).toString().trim()
    console.log(columnify(JSON.parse(apa)))

})()