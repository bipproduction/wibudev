const { exec } = require('child_process')
module.exports = function (param) {
    const child = exec('pm2 log test-raven-stone2_3005')

    return {
        stdout: child.stdout,
        stderr: child.stderr,
        onKill(killed) {
            setTimeout(() => {
                child.kill()
                killed()
            }, 4000)
        }
    }
}
