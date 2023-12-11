const { exec, ChildProcess } = require("child_process");
const app_list = require('./../app_list.json')
const fs = require('fs')
const path = require('path')
require('colors')


/**
 * @type {ChildProcess}
 */
let childProcess;

/**
 * @type {string}
 */
let log;

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports = async function (req, res) {
    const name = req.params.name

    if (!fs.existsSync(path.join(__dirname, `./../../../${name}`))) {
        res.write(`option ${name} Not Available`)
        return res.end()
    }

    const app = app_list.find((v) => v.id === name)
    if (!app) return res.send(`app ${name} not available`)

    if (!childProcess || childProcess === null || childProcess === undefined) {
        const command = `cd ${path.join(__dirname, "./../../../" + name)} && yarn install && npx prisma db push && yarn build`
        childProcess = exec(command);
        prosesnya(childProcess, res)
    } else {
        if (!childProcess.killed) childProcess.kill()
        childProcess = null
        res.end("CLOSE 1")
    }

}

/**
 * 
 * @param {ChildProcess} childProcess 
 * @param {import("express").Response} res 
 */
async function prosesnya(childProcess, res) {
    childProcess.stdout.pipe(res);
    childProcess.stderr.pipe(res);
}
