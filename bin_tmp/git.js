const root = require('child_process').execSync('npm root -g').toString().trim();
const arg = process.argv.splice(2)
const { execSync } = require('child_process');
const _ = require(`${root}/makuro/node_modules/lodash`)
const currentBranch = execSync('git branch --show-current').toString().trim();
require(`${root}/makuro/node_modules/colors`)
const path = require('path')
const colum = require(`${root}/makuro/node_modules/columnify`)

const list_menu = [
    {
        arg: ["-pa", "--push-auto"],
        des: "push otomatis ke github sesui dengan branch terpakai",
        fun: push_auto
    }
];

function help() {
    console.log(`\n
MAKURO GIT APP
Version: 1.0.3

${colum(list_menu.map((v) => ({ ..._.omit(v, ['fun']) })), { showHeaders: true, columnSplitter: "   " }).trim()}
`.gray)

}


async function git() {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.arg.includes(arg[0]))
    if (!app) return help()
    app.fun()
}

git()

// === FUN ===

async function git_push_generate() {
    try {
        execSync(`node ${path.join(__dirname, './../generator.js')}`, { stdio: "inherit" })
        console.log("GENERATE FILE BIN SUCCESS".green)
        push_auto()
    } catch (error) {
        console.log("error")
    }
}

async function push_auto() {
    execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch} `, { stdio: "inherit" })
}