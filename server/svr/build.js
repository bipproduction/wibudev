const { program } = require('commander');
const list_app = require('./../json/app-list.json');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const colors = require('colors');

; (async () => {
    program
        .requiredOption('-n, --name <string>', 'nama app')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    const name = opt.name
    const app = list_app.find((v) => v.name === name)
    if (!app) return console.log("project belum terdaftar !".yellow)
    const dir = path.join(__dirname, `./../../../${name}`)
    const ada = fs.existsSync(dir)
    if (!ada) return console.log("no project dir")
    execSync(`cd ${dir} && pwd && git stash && git pull origin ${app.branch} && yarn install && npx prisma db push && yarn build && pm2 restart ${app.id}`, { stdio: "inherit" })
})()