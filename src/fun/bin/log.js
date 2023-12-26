const yargs = require('yargs');
const { fetch } = require('cross-fetch');

; (async () => {
    const arg = yargs
        .scriptName('log')
        .command('show')
        .options('name', {
            alias: "name",
            string: true,
            demandOption: true
        })
        .argv

    if (arg._[1] === "show") {
        const res = await fetch('https://wibudev.wibudev.com/svr/log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['--name']: arg.name
            })
        })
        res.body.on("data", (data) => {
            console.log(data.toString())
        })
        return
    }

    yargs.showHelp()
})()