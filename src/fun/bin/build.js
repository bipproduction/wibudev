const yargs = require('yargs')
const { fetch } = require('cross-fetch')
require('colors')
const loading = require('loading-cli')('loading ...').start()
module.exports = async function (param) {
    const arg = yargs
        .scriptName('build')
        .option("name", {
            description: "nama dari project",
            alias: "n",
            string: true,
            demandOption: true
        })
        .version("1.0.0")
        .parse()

    const response = await fetch(`${param.url}/svr/build`, {
        method: "POST",
        body: JSON.stringify({
            ['--name']: arg.name
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    response.body.on("data", (data) => {
        loading.stop()
        console.log(data.toString().gray)
    })


}