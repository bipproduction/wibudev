const root = require('child_process').execSync('npm root -g').toString().trim();
const arg = process.argv.splice(2)
const { execSync } = require('child_process');
const _ = require(`${root}/lodash`)
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
require(`${root}/colors`)
const path = require('path')
const colum = require(`${root}/columnify`)

const list_menu = [
    {
        arg: "push-auto",
        des: "push otomatis ke github sesui dengan branch terpakai",
        fun: push_auto
    },
    {
        arg: "push-generate",
        des: "push otomatis dan genearte file bin",
        fun: git_push_generate
    },
    {
        arg: "--help",
        des: "memunculkan menu bantuan",
        fun: help
    }
];

function help() {
    const tbl = list_menu.map((v) => ({
        ...v.arg,
        ...v.des
    }))
    console.log(`\n
GIT APP
version: 1.0.0

${colum(list_menu.map((v) => ({ ..._.omit(v, ['fun']) })), { showHeaders: true, columnSplitter: "   " })}
`.yellow)

}


async function git() {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.arg === arg[0])
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
    try {
        execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch} `, { stdio: "inherit" })

    } catch (error) {
        console.log("telah error".red, error)
    }
}