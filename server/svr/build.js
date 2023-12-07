const arg = process.argv.splice(2);
const sub_arg = require('./../../sub_arg');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const list_app = require('./../json/app-list.json')


const TYPE_APP = {
    id: null,
    name: null,
    port: null,
    type: null,
    branch: null,
    script: {
        run: null,
        restart: null
    }
} || null;


; (() => {
    const param = {
        '--app-name': null
    }

    /**
     * @type {param}
     */
    const sub = sub_arg([...arg.filter((v) => v.includes("--"))], arg)

    /**
     * @type {TYPE_APP}
     */
    const app = list_app.find((v) => v.name === sub['--app'])
    const dir = path.join(__dirname, `./../../../${app.name}`)

    console.log("try to build")
    const cmd = `
cd ${dir}
git stash
git pull origin ${app.branch}
yarn install
${app.type === "nextjs" ? "npx prisma db push && yarn build" : true}
${app.script.restart}
`
    // execSync(cmd, { stdio: "inherit" })
    console.log(cmd)

})()