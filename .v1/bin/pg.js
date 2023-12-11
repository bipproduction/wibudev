const arg = process.argv.splice(2)
require('colors')
const moment = require('moment')
const _ = require('lodash')
const { execSync } = require('child_process')
const { box } = require('teeti')
const columnify = require("columnify")

const list_menu = [
    {
        arg: "dump",
        des: "backup database",
        req: ["--db-name [nama database]"],
        fun: dump
    },
    {
        arg: "restore",
        des: "restore database",
        req: ["--db-name [nama database]", "--file [nama file]"],
        fun: restore
    },
    {
        arg: "sql",
        des: "melakukan kegiatan query",
        req: ["--query [test query]", "--db-name [nama database]"],
        fun: sql
    }
]

function help() {
    console.log(`\n
MAKURO PG APP:
Version: 1.0.3

${box(columnify(list_menu.map((v) => ({ ..._.omit(v, ['fun']) }))))}

`)
}

async function pg() {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.arg === arg[0])
    if (!app) return help()
    app.fun()

}
pg()

function sql() {
    const _req = {
        "--db-name": null,
        "--query": null
    }

    /**
     * @type {_req | null}
     */
    const _sub = sub_arg(_.keys(_req), arg.splice(1))
    if (!_sub) return
    try {
        execSync(`psql "postgresql://bip:Production_123@localhost:5433/${_sub["--db-name"]}" -c "${_sub["--query"]}"`, { stdio: "inherit" })

    } catch (error) {
        console.log("ERROR".red)
    }
}

function dump() {
    const _sub = sub_arg(['--db-name'], arg.splice(1))
    if (!_sub) return
    const _date = moment().format("YYYY-MM-DD")
    const _id = _.random(100000, 1000000)
    const _file = `${_sub['--db-name']}_${_date}_${_id}.pgdump`
    try {
        const _conn = `postgresql://bip:Production_123@localhost:5433/${_sub['--db-name']}`
        execSync(`pg_dump "${_conn}" -O -x -F c > ${_file}`)
        console.log(`SUCCESS ${_file}`.green)
    } catch (error) {
        console.log("ERROR".red)
    }
}

function restore() {
    const _param = {
        "--db-name": null,
        "--file": null
    }
    /**
     * @type {_param | null}
     */
    const _sub = sub_arg(_.keys(_param), arg.splice(1))
    if (!_sub) return

    try {
        const _conn = `postgresql://bip:Production_123@localhost:5433/${_sub['--db-name']}`
        execSync(`pg_restore --no-owner --no-acl --dbname="${_conn}" -c -v "${_sub["--file"]}"`)
        console.log("SUCCESS".green)
    } catch (error) {
        console.log("ERROR".red)
    }
}




// === FUN ===
// psql "postgresql://username:password@localhost:5432/nama_database" -c "SELECT * FROM nama_tabel;"

function sub_arg(list_prop, arg) {
    const prop = {}
    const require = []

    for (let i in list_prop) {
        const idx = arg.findIndex((v) => v === list_prop[i])
        if (idx > -1) {
            const val = arg[idx + 1]
            if (val) {
                prop[arg[idx]] = val
            } else {
                prop[list_prop[i]] = null
                require.push(list_prop[i])
            }
        } else {
            prop[list_prop[i]] = null
            require.push(list_prop[i])
        }

    }

    if (require.length > 0) {
        console.log(`
Require:
${list_prop.join("\n")}
        `)
        return null
    }
    return prop
}