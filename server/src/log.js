const { exec } = require('child_process')

/**
 * @type {ChildProcess}
 */
let child;

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports = async function (req, res) {
    const name = req.params.name
    if (!name) return res.end("require param name")

    const child = exec(`pm2 log ${name}`)
    child.stdout.pipe(res)
    child.stderr.pipe(res)

    setTimeout(function () {
        if (!child.killed) {
            child.kill()
        }
        res.end()
    }, 5000)
}