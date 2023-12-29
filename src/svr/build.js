const yargs = require('yargs');
const { exec, spawn } = require('child_process');
const path = require('path');


; (async () => {
    const arg = yargs
        .option("name", {
            string: true,
            alias: "n",
            demandOption: true
        })
        .parse()

    /**
     * @type {any[]}
     */
    const apps = require(path.join(__dirname, "./../ast/apps.json"))

    const app = apps.find((v) => v.name === arg.name)

    if (!app || app === undefined) return console.log("app tidak ditemukan")

    let cmd;
    if (app.type === "node") {
        cmd = `
cd ${path.join(__dirname, "./../../../" + app.name)}
git stash
git pull origin ${app.branch}
yarn install
npx prisma db push
${app.script.restart}
`
    } else {
        cmd = `
cd ${path.join(__dirname, "./../../../" + app.name)}
git stash
git pull origin ${app.branch}
yarn install
npx prisma db push
yarn build
${app.script.restart}
`
    }

    const child = spawn("/bin/sh", ["-c", cmd])
    child.stdout.on("data", (data) => {
        console.log(data.toString())
    })
    child.stderr.on("data", (data) => {
        console.log(data.toString())
    })

})()