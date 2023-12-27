const { exec } = require('child_process')
module.exports = function (res, param) {
    const child = exec('pm2 log test-raven-stone2_3005')

    child.stdout.on("data", (data) => {
        res.write(data.toSting())
    })
    child.stderr.on("data", (data) => {
        res.write(data.toString())
    })

    setTimeout(() => {
        child.kill()
        res.end()
    }, 5000)
}