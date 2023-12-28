const { exec } = require('child_process')
const path = require('path')
module.exports = function (param) {
    const { name } = param

    if (!(name ?? null)) return {
        stdout(val) {

        },
        stderr(val) {
            val("name require")
        },
        onKill(val) {
            val()
        },
        fun(val) {

        }
    }

    const list_app = require(`${path.join(__dirname, "./../ast/apps.json")}`)
    const app = list_app.find((v) => v.name === name)


    // const child = exec('pm2 log test-raven-stone2_3005')
    return {
        stdout(val) {
            val(JSON.stringify(app))
            // child.stdout.on("data", data => val(data.toString()))
        },
        stderr(val) {
            // child.stderr.on("data", data => val(data.toString()))
        },
        onKill(killed) {
            setTimeout(() => {
                // child.kill()
                killed()
            }, 4000)
        },
        fun(val) {

        }
    }
}
