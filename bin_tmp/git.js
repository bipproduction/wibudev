const arg = process.argv.splice(2)
const root = require('child_process').execSync('npm root -g').toString().trim()
const { execSync } = require('child_process');
const _ = require(`${root}/lodash`)
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
require('colors')

const list_menu = [
    {
        id: "--push-auto",
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
HELP GIT
----------
${list_menu.map((v) => v.id + "\t" + v.des).join('\n\n')}

`.yellow)
}




; (() => {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.id === arg[0])
    if (!app) return help()
    app.fun()
})()


function push_auto() {
    execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch}`, { stdio: "inherit" })
    console.log("success".green)
}