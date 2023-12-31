const { spawn } = require('child_process')
const path = require('path')
const moment = require('moment')
const fs = require('fs')
var child = null;
var waktu = null;
var tm = null;
const ip = require('ip').address()

module.exports = async function (param) {

    const res = await fetch('https://wibudev.wibudev.com/val/runing-app')
    const json_app = (await res.json()).data
    const list_app = json_app.map((v) => v.name)

    const apps = (await fetch(`${param.url}/val/list-app`).then(v => v.json())).data
    const app = apps.find((v) => v.name === param['--name'])

    if (!app) return spawn('/bin/bash', ['-c', 'echo "app not found | 404"'])

    const run_app = list_app.find((v) => v === `${app.name}_${app.studio_port}`)

    if (param['start']) {
        if (param.url.includes("http://")) return spawn("echo", ['anda di local ! error nanti'])
        if (!run_app && app) {
            const pt = path.join(__dirname, `./../../../${app.name}`)
            if (!fs.existsSync(pt)) return spawn("echo", ['project not found'])
            spawn("/bin/bash", ['-c', `cd ${pt} && pm2 start "npx prisma studio --port ${app.studio_port}" --name "${app.name}_${app.studio_port}" `])
            return spawn("echo", [`"http://${ip}:${app.studio_port}"'`])
        }

        if (run_app && app) {
            spawn("/bin/bash", ["-c", `pm2 restart "${app.name}_${app.studio_port}"`])
            return spawn("echo", [`"http://${ip}:${app.studio_port}"`])
        }
    }

    if (param['stop']) {
        spawn("/bin/bash", ["-c", `pm2 stop ${app.name}_${app.studio_port}`])
        return spawn("echo", ['success'])
    }

}