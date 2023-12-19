const { program } = require('commander');
const _ = require('lodash');
const { execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const config = JSON.parse(execSync(`curl -s -o- -X POST https://wibudev`))
// const url_host = execSync('hostname').toString().trim() === "srv442857" ? "https://wibudev.wibudev.com" : "http://localhost:3004";

; (async () => {
    const config = await prisma.config.findUnique({ where: { id: 1 } })
    const url_host = config.dev ? config.url_local : config.url_server
    program
        .version("1.0.0")
        .requiredOption('-n, --name <string>', 'nama app [hipmi, ninox ...]')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    const name = opt.name

    const body = JSON.stringify({
        ['-n']: name
    })
    const child = exec(`curl -s -o- -N -X POST -H "Content-type: application/json" -d '${body}' ${url_host}/svr/build`)
    child.stdout.on("data", console.log)
    child.stderr.on("data", console.log)

})()    