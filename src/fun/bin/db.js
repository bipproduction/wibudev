const yargs = require('yargs');
const { execSync } = require('child_process');
const moment = require('moment');
const _ = require('lodash');
require('colors');
const loading = require('loading-cli');


module.exports = async (param) => {
    yargs
        .scriptName("db")
        .command(
            'import',
            'inject database dari file',
            yargs => yargs
                .options({
                    "db-name": {
                        alias: "d",
                        desc: "nama database",
                        string: true,
                        demandOption: true
                    },
                    "file-name": {
                        alias: "f",
                        desc: "nama filenya",
                        string: true,
                        demandOption: true
                    }
                })
                .example("$0 import -d raven_v2 -f backup.dump".cyan)
                .epilogue("pastikan nama database dan nama file sudah benar"),
            argv => funImport(argv, param)
        )
        .command(
            'export',
            'mengeluarkan data untuk di backuo',
            yargs => yargs
                .options({
                    "db-name": {
                        alias: "d",
                        desc: "nama database",
                        string: true,
                        demandOption: true
                    },
                    "file-name": {
                        alias: "f",
                        desc: "nama filenya",
                        string: true,
                        demandOption: true
                    }
                })
                .example("$0 export -d raven_v2 -f backup".cyan)
                .epilogue("pastikan ada coneksi ke database"),
            argv => funExport(argv, param)
        )

        // .option("db-name", {
        //     string: true,
        //     alias: "d",
        //     demandOption: true
        // })
        // .option("file-name", {
        //     alias: "f",
        //     demandOption: true,
        //     string: true
        // })
        .help()
        .recommendCommands()
        .demandCommand(1, "masukkan command".yellow)
        .epilog("export atau import database postgress")
        .epilog("$0 <command> --help untuk melihat property option")
        .parse(process.argv.splice(3))

    // if (!arg._[1]) return yargs.showHelp()

    // const load = loading("loading ...").start()
    // await new Promise(r => setTimeout(r, 1000))
    // if (arg._[1] === "export") {
    //     try {
    //         const _file_name = arg.fileName + ".dump"
    //         const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
    //         execSync(`pg_dump "${_conn}" -O -x -F c > ${_file_name}`)
    //         console.log(`SUCCESS ${_file_name}`.green)
    //     } catch (error) {
    //         console.log("LOH ERROR ...!".yellow)
    //     }

    //     load.stop()
    //     return
    // }

    // if (arg._[1] === "import") {

    //     try {
    //         const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
    //         execSync(`pg_restore --no-owner --no-acl --dbname="${_conn}" -c -v "${arg.fileName}"`)
    //         console.log("SUCCESS".green)

    //     } catch (error) {
    //         console.log("LOH ERROE... !".yellow)
    //     }

    //     load.stop()
    //     return
    // }
}

async function funImport(arg, param) {
    try {
        const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
        execSync(`pg_restore --no-owner --no-acl --dbname="${_conn}" -c -v "${arg.fileName}"`)
        console.log("SUCCESS".green)

    } catch (error) {
        console.log("LOH ERROE... !".yellow)
    }

}

async function funExport(arg, param) {
    try {
        const _file_name = arg.fileName + ".dump"
        const _conn = `postgresql://bip:Production_123@localhost:5433/${arg.dbName}`
        execSync(`pg_dump "${_conn}" -O -x -F c > ${_file_name}`)
        console.log(`SUCCESS ${_file_name}`.green)
    } catch (error) {
        console.log("LOH ERROR ...!".yellow)
    }
}