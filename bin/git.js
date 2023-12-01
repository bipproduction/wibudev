const arg = process.argv.splice(2)
const { execSync } = require('child_process');
const _ = require('lodash')
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
require('colors')

const list_menu = [
    {
        id: "push-auto",
        des: "push otomatis ke github sesui dengan branch terpakai",
        fun: push_auto
    },
    {
        id: "--help",
        des: "memunculkan menu bantuan",
        fun: help
    }
];

function help() {
    console.log(`\n
GIT APP
version: 1.0.0
----------
${list_menu.map((v) => v.id + "\t" + v.des).join('\n\n')}

`.yellow)
}


async function git() {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.id === arg[0])
    if (!app) return help()
    app.fun()
}

git()


async function push_auto() {
    try {
        execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch} `, { stdio: "inherit" })

    } catch (error) {
        console.log("telah error".red, error)
    }
}