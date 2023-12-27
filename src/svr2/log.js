const { exec } = require('child_process')
module.exports = function (param, stdout, stderr, onKill) {
    const child = exec('pm2 log test-raven-stone2_3005')

    child.stdout.on("data", (data) => {
        stdout(data.toString())
    })
    child.stderr.on("data", (data) => {
        stderr(data.toString())
    })

    setTimeout(() => {
        child.kill()
        onKill()
    }, 5000)
}