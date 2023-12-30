const yargs = require('yargs')
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

    console.log(arg._[1])
    if (arg._[1] !== "start" && arg._[1] !== "stop") {
        return console.log("require command start | stop")
    }

    if (arg.name && typeof arg.name === "string") {

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

    yargs.showHelp()


}