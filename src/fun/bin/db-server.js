const yargs = require('yargs')
const { fetch } = require('cross-fetch');
const { box } = require('teeti')
require('colors')
const { execSync, spawn } = require('child_process')
const loading = require('loading-cli')('loading ...').stop()
const _ = require('lodash')
const fs = require('fs')
require('colors')

module.exports = async function (param) {
    yargs
        .scriptName("db-server")
        .command("list", "melihat list yang tersedia di server", yargs => yargs, arg => list(arg, param))
        .command(
            "export",
            "export database dari posgre pada server dan ditempatkan pada list",
            yargs => yargs
                .options("db-name", {
                    alias: "d",
                    string: true,
                    desc: "nama dari database di app",
                    demandOption: true
                })
                .option("file-name", {
                    alias: "f",
                    desc: "nama file yang akan diexport contoh : 2023_01_03_backup_raven",
                    string: true,
                    demandOption: true
                })
                .example("$0 export -d raven_v2 -f backup_raven_23_01_03"),
            arg => exp(arg, param)
        )
        .command(
            "download",
            "mendownload hasil dari export, lihat di list untuk nama file",
            yargs => yargs
                .option("file-name", {
                    alias: "f",
                    desc: "nama dari filenya",
                    string: true,
                    demandOption: true
                })
                .example("$0 download -f backup_2023.dump"),
            arg => funDownload(arg, param))
        .command(
            'db-name',
            'melihat nama database jika ada',
            yargs => yargs
                .option("app-name", {
                    alias: "a",
                    desc: "nama app",
                    string: true,
                    demandOption: true
                })
                .example("$0 -a raven_stone2"),
            argv => funDbName(argv, param)
        )
        .command(
            "upload",
            "upload file dump dari local ke server",
            yargs => yargs
                .option("file-name", {
                    alias: "f",
                    desc: "nama filenya",
                    string: true,
                    demandOption: true
                }),
            argv => funUpload(argv, param)
        )
        .recommendCommands()
        .demandCommand(1, "minimal masukkan satu command")
        .help()
        .epilog("gunakan $0 <command> --help untuk melihat detail option ")
        .parse(process.argv.splice(3))

}

async function list(arg, param) {
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
}

async function exp(arg, param) {
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
}

async function funDownload(arg, param) {
    if (!arg.fileName) return console.log(box("require file-name"))
    execSync(`curl ${param.url}/db-download/${arg.fileName} --output ${arg.fileName}`, { stdio: "inherit" })
    console.log(box(`file save as ${arg.fileName}`).green)
}

async function funDbName(arg, param) {
    const res = await fetch(`${param.url}/val/${arg._[1]}?appName=${arg.appName}`)
    console.log(await res.text())
}

async function funUpload(arg, param) {
    const ada_file = fs.existsSync(arg.fileName)
    if (!ada_file) return console.log(`FILE <${arg.fileName}> GK ADA MONYOG!`.yellow)

    // filenya adalah postgres file.dump
    const file = fs.readFileSync(arg.fileName)
    await fetch(`${param.url}/upload/db`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            file_name: arg.fileName,
            data: file.toString("utf-8")
        })
    })

    // const child = spawn('/bin/bash', ['-c', `curl -s -X POST -H "Content-Type: multipart/form-data" -F "file=@${arg.fileName}" ${param.url}/upload/db`])
    // child.stdout.on("data", data => console.log(data.toString()))
    // child.stderr.on('data', data => console.log(data.toString()))
}