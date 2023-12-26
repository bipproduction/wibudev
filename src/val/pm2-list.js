const { execSync } = require('child_process')
module.exports = async function () {
    const list = execSync('pm2 jlist').toString().trim()
    return JSON.parse(list)
}