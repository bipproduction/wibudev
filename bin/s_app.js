const arg = process.argv.splice(2)
const _ = require('lodash')
require('colors')
const { execSync } = require('child_process')
const host_name = execSync('hostname').toString().trim()

const list_menu = [
    {
        id: "server_available",
        arg: "ser-ava",
        des: "menampilkan list server",
        fun: server_available
    }
]

function help() {
    console.log(`\n
SERVER APP:
version: 1.0.0
--------------
${list_menu.map((v) => v.arg + "\t" + v.des).join(('\n'))}
    
    `.cyan)
}

async function server_app() {
    if (host_name !== "srv442857") return console.log(`
    app ini hanya bisa berjalan di server
    `.yellow)

    if (_.isEmpty(arg)) return help()
    const app = list_menu.find((v) => v.arg === arg[0])
    if (!app) return help()
    app.fun()
}

server_app()

// === FUN ===

function server_available() {
    try {
        const ls_available = execSync(`ls /etc/nginx/sites-enabled`).toString().trim()
        console.log(ls_available)
    } catch (error) {
        console.log
    }
}