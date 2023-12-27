const { exec } = require('child_process')
module.exports = function (param) {
    const child = exec('pm2 log test-raven-stone2_3005')
    setTimeout(() => {
        child.kill()
    }, 5000)
    return {
        stdout: child.stdout,
        stderr: child.stderr,
        pipe: function (res) {
            child.stdout.pipe(res)
            child.stderr.pipe(res)
        }
    }
}