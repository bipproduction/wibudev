const { exec } = require('child_process');
const path = require('path');
const yargs = require('yargs');
; (async () => {
    const arg = yargs
        .scriptName('log')
        .command('show')
        .options('name', {
            alias: 'n',
            string: true,
            demandOption: true
        })
        .argv

    if (arg._[0] === "show") {
        const app = require('./../ast/apps.json')
        const a = app.find((v) => v.name === arg.name)
        if (!a) return console.log("no app available")
        const child = exec(`pm2 log ${a.id}`)
        child.stdout.on("data", console.log)
        child.stderr.on("data", console.log)

        await new Promise(r => setTimeout(r, 5000))
        child.kill()
        return
    }

    yargs.showHelp()
})()