const { exec } = require('child_process');
const path = require('path');
const { box } = require('teeti');
const yargs = require('yargs');
const loading = require('loading-cli')("loading ...").start();

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
            loading.stop()
            child.kill()
        } catch (error) {
            loading.stop()
            console.log("errornya adalah", error)
            child.kill()
        }
        return
    }

    loading.stop()
    console.log(box("SERVER"))
    yargs.showHelp()
})()