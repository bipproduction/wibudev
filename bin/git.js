const arg = process.argv.splice(2)
const root = require('child_process').execSync('npm root -g').toString().trim()
const { execSync } = require('child_process');
const _ = require('lodash')
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
require('colors')
const { fetch } = require('cross-fetch')

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


async function push_auto() {
    try {
        execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch} && curl -X POST https://wibudev.wibudev.com/build`, { stdio: "inherit" })
        // await fetch('https://wibudev.wibudev.com/build', { method: "POST" }).then(async (v) => {
        //     console.log(await v.text())
        // })

        console.log("success".green)
    } catch (error) {
        console.log("telah error".red, error)
    }
}