const yargs = require('yargs')
const loading = require('loading-cli')('studio loading ...').start()
module.exports = async function (param) {

    const arg = yargs
        .scriptName('studio')
        .command("start")
        .command("stop")
        .option('name', {
            alias: "n",
            string: true,
            demandOption: true
        })
        .argv

    if (arg._[1] !== "start" && arg._[1] !== "stop") {
        loading.stop()
        return console.log("require command start | stop")
    }

    if (arg.name && typeof arg.name === "string") {
        loading.stop()
        const res = await fetch(`${param.url}/svr2/studio`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "start": arg._[1] === "start",
                "stop": arg._[1] === "stop",
                ['--name']: arg.name,
                ...param
            })
        })

        const data = await res.text()
        console.log(data)

        return
    }

    loading.stop()
    yargs.showHelp()


}