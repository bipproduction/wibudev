const root = require('child_process').execSync('npm root -g').toString().trim()
const arg = process.argv.splice(2)
const { exec, execSync } = require('child_process')
const http = require('http')

const list_menu = [
    {
        id: "raven-stone2",
        type: "server",
        port: 3000,
        category: "build",
        act: fun_build
    },
    {
        id: "raven-stone2",
        type: "server",
        port: 3000,
        category: "log",
        act: fun_log
    },
    {
        id: "auto-push",
        type: "local",
        port: null,
        category: "git",
        act: fun_auto_push
    }
]

const local_menu = [
    {
        "id": "push",
        "des": "ngepush",
        "act": ""
    }
]

function help() {
    console.log(`
========================================================
* MENU
========================================================
* App: 
*   - raven-stone2
*   - hipmi
*
* Type:
*   - server
*   - local
*
* Category: 
*  - build
*  - log
*  - push
*
* Example:
*  - curl -s -o- http://localhost:3000 | node - server build raven-stone2
========================================================   
`)
}

async function main() {
    if (arg.length === 0) return help()

    const server = list_menu.filter((v) => v.type === "server")
    const local = list_menu.filter((v) => v.type === "local")

    if (arg[0] === "server") {
        if (arg.length < 2) return help()
        const app = server.find((v) => v.category === arg[1] && v.id === arg[2])
        if (!app) return help()
        app.act()
    }

    if (arg[0] === "local") {

        if (arg.length < 2) return help()
        const app = local.find((v) => v.category === arg[1] && v.id === arg[2])
        if (!app) return help()
        app.act()
    }


}
main()


// --------- FUN -----------

async function fun_log() {
    http.get(`http://localhost:3000/log/${this.id}_${this.port}`, (res) => {
        res.on("data", (data) => {
            console.log(data.toString())
        })
    })
}


async function fun_build() {
    http.get(`http://localhost:3000/build/${this.id}`, (res) => {
        res.on("data", (data) => {
            console.log(data.toString())
        })
    })
}


async function fun_auto_push() {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    const child = exec(`git add -A && git commit -m "auto push" && git push origin ${currentBranch}`)
    child.stdout.on("data", (data) => {
        console.log(data.toString())
    })

    child.stderr.on("data", data => {
        console.log(data.toString())
    })
}

function groupBy(array, key) {
    return array.reduce((result, currentItem) => {
        const keyValue = currentItem[key];
        if (!result[keyValue]) {
            result[keyValue] = [];
        }

        result[keyValue].push(currentItem);

        return result;
    }, {});
}