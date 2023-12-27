const { exec } = require('child_process')
module.exports = function (param) {
    const child = exec('pm2 log test-raven-stone2_3005')
    return {
        stdout(val) {
            child.stdout.on("data", data => val(data.toString()))
        },
        stderr(val) {
            child.stderr.on("data", data => val(data.toString()))
        },
        onKill(killed) {
            setTimeout(() => {
                child.kill()
                killed()
            }, 4000)
        }
    }
}
