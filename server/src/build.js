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

    // childProcess.stdout.on('data', async (data) => {
    //     await new Promise(r => setTimeout(function () {
    //         console.log(data.green)
    //         res.write(data.toString());
    //         r()
    //     }, 1000))
    // });

    // childProcess.stderr.on('data', async (data) => {
    //     res.write("\n== STD_ERROR ==\n")
    //     console.log(data.yellow)

    // });

    // childProcess.stdout.on('error', async (data) => {
    //     res.write("\n== ERROR ==\n")
    //     console.log(data.red)
    // });

    // childProcess.on('close', async (code) => {
    //     res.write("\n== CLOSE ==\n")
    //     console.log(`-- Proses selesai dengan kode keluar: ${code}`.gray);
    //     await kill_proccess(childProcess, res)
    //     res.end("CLOSE 2")
    // });
}
