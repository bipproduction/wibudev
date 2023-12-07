const root = require('child_process').execSync('npm root -g').toString().trim();
const { execSync } = require('child_process');
const columnify = require(`${root}/makuro/node_modules/columnify`);
const _ = require(`${root}/makuro/node_modules/lodash`)
const arg = process.argv.splice(2)
const urlhost = execSync(`hostname`) === "srv442857" ? "https://wibudev.wibudev.com" : "http://localhost:3005";

const list_menu = [
    {
        arg: ["log"],
        des: "melihat log server",
        fun: () => {
            execSync(`curl -s -o- ${urlhost}/svr/log`, { stdio: "inherit" })
        }
    }
];

function help() {
    console.log(`
MAKURO LOG APP
version: 1.0.0

${columnify(list_menu.map((v) => ({ ..._.omit(v, ['fun']) })))}
    `)
}

; (async () => {
    if (_.isEmpty(arg)) return help()
    const app = list_menu.find((v) => v.arg.includes(arg[0]))
    if (!app) return help()
    app.fun()
})()