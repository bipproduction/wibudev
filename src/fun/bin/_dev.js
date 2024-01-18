const columnify = require("columnify")
const yargs = require('yargs')
const _ = require('lodash')
const { fetch } = require('cross-fetch')
const { box } = require('teeti')
const { execSync } = require('child_process')
require('colors')
const up = require('')


module.exports = async function (param) {

    const apps = param.apps.map((v) => ({ ..._.omit(v, ['script']) }))
    yargs
        .scriptName("_dev")
        .command("list-app", "ini list app", yargs => yargs, arg => console.log(columnify(apps).gray))
        .command('set-host', "set developer", yargs => yargs
            .option("host-name", {
                alias: "h",
                string: true,
                desc: "nama dev",
                demandOption: true
            }), arg => setHost(arg, param))
        .command('list-server', 'melihat list server', yargs => yargs, listServer)
        .command('runing-app', 'melihat app yang sedang berjalan', yargs => yargs, runningApp)
        .command(
            "set-dev",
            "set mode developer",
            yargs => yargs,
            funSetModeDev
        )
        .command(
            "set-pro",
            "set ke mode production",
            yargs => yargs,
            funSetPro
        )
        .version("1.0.0")
        .demandCommand(1, "minimal masukkan satu command")
        .recommendCommands()
        .help()
        .epilog("gunakan $0 <command> --help untuk melihat property option")
        .parse(process.argv.slice(3))

}

async function setHost(arg, param) {
    const res = await fetch(`${param.url_pro}/config?host_name=${arg.hostName}`)
    const data = await res.json()
    console.log(box(data.host_name).green)
}

async function listServer(arg) {
    const res = await fetch('https://wibudev.wibudev.com/val/list-server')
    const data = await res.json()
    console.log(columnify(_.sortBy(data.data, "port")))
}

async function runningApp(arg) {
    const res = await fetch('https://wibudev.wibudev.com/val/runing-app')
    const data = (await res.json()).data
    console.log(columnify(data.map((v, k) => ({ no: k + 1, name: v.name, status: v.pm2_env.status }))))
}

async function funSetModeDev(yargs) {
    const hostname = execSync('hostname').toString().trim()
    execSync(`makuro _dev set-host --host-name ${hostname}`, { stdio: "inherit" })
}

async function funSetPro(argv) {
    execSync(`makuro _dev set-host --host-name makuro`, { stdio: "inherit" })
}


