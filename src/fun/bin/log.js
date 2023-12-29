const yargs = require('yargs');
const { fetch } = require('cross-fetch');
const loading = require('loading-cli')('loading ...').start()

module.exports = async function (param) {
    const arg = yargs
        .scriptName('log')
        .option('name', {
            alias: "n",
            string: true,
            demandOption: true
        })
        .argv

    if (arg.name && typeof arg.name === "string") {
        const res = await fetch(`${param.url}/svr2/log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['--name']: arg.name
            })
        })
        res.body.on("data", (data) => {
            loading.stop()
            console.log(data.toString())
        })
        return
    }

    loading.stop()
    yargs.showHelp()
}