const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const { box } = require('teeti')
const loading = require('loading-cli')('loading ...').start()
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
        if (res.success) return console.log(box(res.message).green)
        return console.log(box(res.message).yellow)
    }

    loading.stop()
    yargs.showHelp()
}
