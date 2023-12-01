const arg = process.argv.splice(2)
const _ = require('lodash')
require('colors')
const { execSync } = require('child_process')
const host_name = execSync('hostname').toString().trim()
const path = require('path')

const list_menu = [
    {
        id: "server_available",
        arg: "ser-ava",
        des: "menampilkan list server",
        fun: server_available
    },
    {
        id: "crt",
        arg: "crt",
        des: "create new server app",
        fun: create_server_app
    }
]

function help() {
    console.log(`\n
WIBUDEV:
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

function create_server_app() {
    const config = JSON.parse(execSync(`curl -s -o- https://wibudev.wibudev.com/assets/config.json`).toString().trim())
    const prop = {
        ['--server-name']: null,
        ['--port']: null,
        ['--app-name']: null
    }

    const url = host_name === config.server.host_name ? `${config.env.prod.protocol}://${config.env.prod.host}/assets/sub-arg` : `${config.env.dev.protocol}://${config.env.dev.host}:${config.env.dev.port}/assets/sub-arg`
    const sub_text = execSync(`curl -s -o- ${url}`).toString().trim()
    eval(sub_text)

    /**
     * @type {prop}
     */
    const sub = sub_arg(_.keys(prop), arg)
    if (!sub) return

    const text = `
server {
	server_name ${sub['--server-name']};

	location / {
		proxy_pass http://localhost:${sub['--port']};
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
`
    const target = path.join(__dirname, `/etc/nginx/sites-enabled/${sub['--app-name']}_${sub['--port']}`)
    execSync(`sudo echo "${text}" > ${target}`, { stdio: "inherit" })
    console.log("SUCCESS".green)

}

function server_available() {
    try {
        const ls_available = execSync(`ls /etc/nginx/sites-enabled`).toString().trim()
        const sp = ls_available.split("\n").map((v) => ({
            "name": v,
            "port": +(v.split('_')[1])
        }))

        console.table(sp)
        console.log("MAX PORT: ", _.maxBy(sp, (v) => v.port))

    } catch (error) {
        console.log
    }
}