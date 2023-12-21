const yargs = require('yargs')
const { fetch } = require('cross-fetch');
const { box } = require('teeti')
require('colors')
const { execSync } = require('child_process')
module.exports = async function (param) {
    const arg = yargs
        .command("list")
        .command("import")
        .command("export")
        .command("download")
        .option("db-name", {
            alias: "d",
            string: true
        })
        .option("file-name", {
            alias: "f",
            string: true
        })
        .parse()

    if (arg._[1] === "list") {
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
            console.log(data.toString())
        })

        return

    }

    if (arg._[1] === "import") {
        if (!arg.dbName || !arg.fileName) return console.log(box("require db-name && file-name").yellow)

        return
    }

    if (arg._[1] === "export") {
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
            console.log(data.toString())
        })

        return
    }

    if (arg._[1] === "download") {
        if (!arg.fileName) return console.log(box("require file-name"))
        execSync(`curl ${param.url}/db-download/${arg.fileName} --output ${arg.fileName}`, { stdio: "inherit" })
        console.log(box(`file save as ${arg.fileName}`).green)
        return
    }

    yargs.showHelp()

}