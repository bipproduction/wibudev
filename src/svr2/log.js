const { exec } = require('child_process')
const path = require('path')
let kill = false;
module.exports = function (param) {
    const { name } = param

    const list_app = require(`${path.join(__dirname, "./../ast/apps.json")}`)
    const app = list_app.find((v) => v.name === name)

    return function (stdout, stdkill, stdfun) {

        stdout(JSON.stringify(app))
        if (kill) {
            setTimeout(() => {
                kill = true
                stdkill()
            }, 4000)
        }
    }
}
