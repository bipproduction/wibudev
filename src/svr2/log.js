const { exec } = require('child_process')
const path = require('path')
let kill = false;

/**
 * @type {ChildProcess}
 */
let child;

module.exports = function (param) {
    const name = param['--name']

    const list_app = require(`${path.join(__dirname, "./../ast/apps.json")}`)
    const app = list_app.find((v) => v.name === name)

    if (!app) {
        return child = exec(`echo "No App Found"`)
    }

    if (!kill) {
        kill = true
        child = exec(`pm2 logs ${app.id}`)
        setTimeout(() => {
            kill = false
            child.kill()
        }, 4000)
    }

    return child

}
