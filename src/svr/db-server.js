const yargs = require('yargs');
const { execSync } = require('child_process')
const fs = require('fs');
const path = require('path');
const columnify = require('columnify');
require('colors');
const { box } = require('teeti');

; (async () => {
    const arg = yargs
        .scriptName('db-server')
        .command("import")
        .command("export")
        .command("list")
        .option('db-name', {
            alias: "d",
            string: true
        })
        .option("file-name", {
            alias: "f",
            string: true
        })
        .parse()

    if (arg._[0] === "import") {
        if (!arg.dbName || !arg.fileName) return console.log(box("require db-name & file-name"))
    }

    if (arg._[0] === "export") {
        if (!arg.dbName || !arg.fileName) return console.log(box("require db-name & file-name"))
        const pt = path.join(__dirname, "./../db_backup")
            const file_name = arg.fileName + ".dump"
            const conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
        try {
            execSync(`pg_dump "${conn}" -O -x -F c > ${pt}/${file_name}`)
            console.log(`SUCCESS ${file_name}`.green)
        } catch (error) {
            fs.unlinkSync(`${pt}/${file_name}`)
            console.log("LOH ERROR ...!".yellow)
        }

        return

    }

    if (arg._[0] === "list") {
        const pt = path.join(__dirname, "./../db_backup")
        const dir = fs.readdirSync(pt)
        console.log(box(columnify(dir.map((v, k) => ({no: k+1, name: v })))))
        return
    }

    console.log("    server    ".bgYellow)
    yargs.showHelp()
})()