const yargs = require('yargs');
const { execSync } = require('child_process');
const moment = require('moment');
const _ = require('lodash');
require('colors');
const loading = require('loading-cli');

module.exports = async (param) => {
    const arg = yargs
        .command('import')
        .command('export')
        .scriptName("db")
        .option("db-name", {
            string: true,
            alias: "d",
            demandOption: true
        })
        .option("file-name", {
            alias: "f",
            demandOption: true,
            string: true
        })
        .epilog("pastikan nama database dan filenya benar bisa berakibat fatal !")
        .parse()

    if (!arg._[1]) return yargs.showHelp()

    const load = loading("loading ...").start()
    await new Promise(r => setTimeout(r, 1000))
    if (arg._[1] === "export") {
        try {
            const _file_name = arg.fileName + ".dump"
            const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
            execSync(`pg_dump "${_conn}" -O -x -F c > ${_file_name}`)
            console.log(`SUCCESS ${_file_name}`.green)
        } catch (error) {
            console.log("LOH ERROR ...!".yellow)
        }

        load.stop()
        return
    }

    if (arg._[1] === "import") {

        try {
            const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
            execSync(`pg_restore --no-owner --no-acl --dbname="${_conn}" -c -v "${arg.fileName}"`)
            console.log("SUCCESS".green)

        } catch (error) {
            console.log("LOH ERROE... !".yellow)
        }

        load.stop()
        return
    }
}