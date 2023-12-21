const columnify = require("columnify")
const yargs = require('yargs')
const _ = require('lodash')

module.exports = async function (param) {
    const apps = param.apps.map((v) => ({ ..._.omit(v, ['script']) }))

    const arg = yargs
        .command("list-app")
        .version("1.0.0")
        .parse()

    if (arg._[1] === "list-app") {
        console.log(columnify(apps).gray)
        return
    }

    yargs.showHelp()
}