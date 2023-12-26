const { exec } = require('child_process');
const path = require('path');
const { box } = require('teeti');
const yargs = require('yargs');
; (async () => {
    const arg = yargs
        .scriptName('log')
        .option('name', {
            alias: 'n',
            string: true,
            demandOption: true
        })
        .argv

    if (arg.name) {
        const app = require('./../ast/apps.json')
        const a = app.find((v) => v.name === arg.name)
        if (!a) return console.log("no app available")
        const child = exec(`pm2 log ${a.id}`)
        try {
            child.stdout.on("data", console.log)
            child.stderr.on("data", console.log)
            await new Promise(r => setTimeout(r, 1000))
            child.kill()
        } catch (error) {
            console.log("errornya adalah", error)
            child.kill()
        }
        return
    }

    console.log(box("SERVER"))
    yargs.showHelp()
})()