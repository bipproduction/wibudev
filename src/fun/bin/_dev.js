const columnify = require("columnify")
const yargs = require('yargs')
const _ = require('lodash')
const { fetch } = require('cross-fetch')
const { box } = require('teeti')
const { execSync } = require('child_process')
require('colors')
const loading = require('loading-cli')('loading ...').start()

module.exports = async function (param) {
    const apps = param.apps.map((v) => ({ ..._.omit(v, ['script']) }))

    const arg = yargs
        .scriptName("_dev")
        .command("list-app", "ini list app")
        .command('set-host', "set developer")
        .command('list-server', 'melihat list server')
        .command('runing-app', 'melihat app yang sedang berjalan')
        .option('host-name', {
            alias: "h",
            string: true
        })
        .version("1.0.0")
        .argv

    if (arg._[1] === "list-app") {
        loading.stop()
        console.log(columnify(apps).gray)
        return
    }

    if (arg._[1] === "set-host") {
        loading.stop()
        if (!arg.hostName) return console.log(box("require host-name").yellow)
        const res = await fetch(`${param.url_pro}/config?host_name=${arg.hostName}`)
        const data = await res.json()
        console.log(box(data.host_name).green)
        return
    }

    if (arg._[1] === "list-server") {
        loading.stop()
        const res = await fetch('https://wibudev.wibudev.com/val/list-server')
        const data = await res.json()
        console.log(columnify(_.sortBy(data.data, "port")))
        return
    }

    if (arg._[1] === "runing-app") {
        loading.stop()
        const res = await fetch('https://wibudev.wibudev.com/val/runing-app')
        const data = await res.json()
        console.log(columnify(_.sortBy(data.data, "port")))
        return
    }

    loading.stop()
    yargs.showHelp()
}

