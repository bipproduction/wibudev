const arg = process.argv.splice(2)
const root = require('child_process').execSync('npm root -g').toString().trim()
const { execSync } = require('child_process');
const _ = require('lodash')
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
require('colors')

function help() {
    console.log(`\n
HELP GIT
----------

`.yellow)
}


const list_menu = [
    {
        id: "push-auto",
        fun: push_auto
    }
];

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