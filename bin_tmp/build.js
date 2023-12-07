const root = require('child_process').execSync('npm root -g').toString().trim();
const arg = process.argv.splice(2)
const { execSync } = require('child_process')
const columnify = require(`${root}/makuro/node_modules/columnify`)
const host = execSync('hostname').toString().trim() === "srv442857" ? "https://wibudev.wibudev.com" : "http://localhost:3005"
const list_server = JSON.parse(execSync(`curl -s -o- ${host}/json/app-list`).toString().trim())
const _ = require(`${root}/makuro/node_modules/lodash`)
require(`${root}/makuro/node_modules/colors`)

eval(execSync(`curl -s -o- ${host}/fun/sub_arg`).toString().trim())

function help() {
    console.log(`
MAKURO BUILD APP
Version: 1.0.3

require: --app
--------------
${columnify(list_server.filter((v) => v.type === "nextjs").map((v, k) => ({ name: v.name })), {showHeaders: false})}
`.gray)
}

; (() => {
    if (_.isEmpty(arg)) return help()
    const param = {
        ["--app"]: null
    }

    /**
     * @type {param}
     */
    const sub = sub_arg(_.keys(param), arg)
    if (!sub) return
    const app = list_server.find((v) => v.name === sub['--app'])
    if (!app || app === undefined) return help()

    const body = {
        ['--app']: app.name
    }

    const prm = _.flatten(_.keys(body).map((v) => [v, body[v]])).join('/')
    execSync(`curl -s -o- -N ${host}/svr/build?arg=${prm}`, { stdio: "inherit" })

})()