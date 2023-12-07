const arg = process.argv.splice(2)
const { execSync, exec } = require('child_process');
const _ = require('lodash')
const currentBranch = execSync('git branch --show-current').toString().trim();
require('colors')
const path = require('path')
const colum = require('columnify')
const { box } = require('teeti')

const list_menu = [
    {
        arg: ["-pa", "--push-auto"],
        des: "push otomatis ke github sesui dengan branch terpakai",
        fun: push_auto
    },
    {
        arg: ["-pg", "--push-generate"],
        des: "push otomatis dan genearte file bin",
        fun: git_push_generate
    },
    {
        arg: ['-h', '--help'],
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
MAKURO GIT APP
version: 1.0.0

${colum(list_menu.map((v) => ({ ..._.omit(v, ['fun']) })), { showHeaders: true, columnSplitter: "   " }).trim()}
`)

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
    const child = exec(`git add -A && git commit -m "auto push" && git push origin ${currentBranch} `)
    child.stderr.on("data", console.log)
    child.stdout.on("error", console.log)
}