const { exec } = require('child_process')
module.exports = function (param) {
    const child = exec('pm2 log wibudev')
    return {
        stdout: child.stdout,
        stderr: child.stderr,
        pipe: function (res) {
            child.stdout.pipe(res)
            child.stderr.pipe(res)
        }
    }
}