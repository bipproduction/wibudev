const yargs = require('yargs')
const { fetch } = require('cross-fetch')
module.exports = async function (param) {
    const arg = yargs
        .scriptName('biold')
        .option("name", {
            alias: "n",
            string: true,
            demandOption: true
        })
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
        console.log(data.toString())
    })


}