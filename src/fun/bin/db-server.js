const yargs = require('yargs')
const { fetch } = require('cross-fetch');
const { box } = require('teeti')
require('colors')
const { execSync } = require('child_process')
const loading = require('loading-cli')('loading ...').start()
module.exports = async function (param) {
    const arg = yargs
        .command("list", "melihat list yang tersedia di server")
        .scriptName("db-server")
        .command("export", "export database dari posgre dan ditempatkan pada list")
        .command("download", "mendownload hasil dari export")
        .option("db-name", {
            description: "nama database",
            alias: "d",
            string: true
        })
        .option("file-name", {
            description: "nama file contoh [hipmi]",
            alias: "f",
            string: true
        })
        .parse()

    if (arg._[1] === "list") {
        loading.stop()
        const res = await fetch(`${param.url}/svr/db-server`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "list": ""
            })
        })

        res.body.on("data", (data) => {
            loading.stop()
            console.log(data.toString())
        })

        return

    }

    if (arg._[1] === "import") {
        loading.stop()
        if (!arg.dbName || !arg.fileName) return console.log(box("require db-name && file-name").yellow)

        return
    }

    if (arg._[1] === "export") {
        loading.stop()
        if (!arg.dbName || !arg.fileName) return console.log(box("require db-name && file-name").yellow)
        const res = await fetch(`${param.url}/svr/db-server`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "export": "",
                "--db-name": arg.dbName,
                "--file-name": arg.fileName
            })
        })

        res.body.on("data", (data) => {
            loading.stop()
            console.log(data.toString())
        })

        return
    }

    if (arg._[1] === "download") {
        loading.stop()
        if (!arg.fileName) return console.log(box("require file-name"))
        execSync(`curl ${param.url}/db-download/${arg.fileName} --output ${arg.fileName}`, { stdio: "inherit" })
        console.log(box(`file save as ${arg.fileName}`).green)
        return
    }

    loading.stop()
    yargs.showHelp()

}