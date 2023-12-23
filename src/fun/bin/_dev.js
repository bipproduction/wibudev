const columnify = require("columnify")
const yargs = require('yargs')
const _ = require('lodash')
const { fetch } = require('cross-fetch')
const { box } = require('teeti')
require('colors')

module.exports = async function (param) {
    const apps = param.apps.map((v) => ({ ..._.omit(v, ['script']) }))

    const arg = yargs
        .scriptName("_dev")
        .command("list-app", "ini list app")
        .command('set-host', "set developer")
        .option('host-name', {
            alias: "h",
            string: true
        })
        .version("1.0.0")
        .argv

    if (arg._[1] === "list-app") {
        console.log(columnify(apps).gray)
        return
    }

    if (arg._[1] === "set-host") {
        if (!arg.hostName) return console.log(box("require host-name").yellow)
        const res = await fetch(`${param.url_pro}/config?host_name=${arg.hostName}`)
        const data = await res.json()
        console.log(box(data.host_name).green)
        return
    }

    yargs.showHelp()
}
