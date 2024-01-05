const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const { box } = require('teeti')
const loading = require('loading-cli')('loading ...').start()
const { open } = require('openurl')
module.exports = async (param) => {
    const arg = yargs
        .command("register <string>", "untuk mendaftar")
        .scriptName("auth")
        .options("host-name", {
            alias: "h",
            string: true
        })
        .strictOptions()
        .parse()

    if (arg._[1] === "register") {
        loading.stop()
        if (!(arg.hostName ?? null)) {
            loading.stop()
            return yargs.showHelp()
        }

        const kirim = await fetch(`${param.url}/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                host_name: arg.hostName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await kirim.json()
        const list_host = ["amel.local", "bips-MacBook-Air.local", "srv442857"]
        if (!list_host.includes(arg.hostName)) return open('https://assets.kompasiana.com/statics/crawl/556cff710423bd6c528b4567.jpeg')
        if (res.success) return console.log(box(res.message).green)
        return console.log(box(res.message).yellow)
    }

    loading.stop()
    yargs.showHelp()
}
