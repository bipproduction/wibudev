const express = require('express');
const { execSync, exec } = require('child_process');
const sub_arg = require('../sub_arg');
const arg = process.argv.splice(2)
const app = express();
const fs = require("fs")
const path = require('path')
require("colors")
const list_audience = require('./../assets/audience.json')

async function main() {
    const sub = sub_arg(['--port'], arg)
    if (!sub) return

    app.get("/", (req, res) => {
        res.send("apa kabarnya")
    })

    app.post('/cmd/:name', (req, res) => {
        const name = req.params.name
        console.log("cmd", name.cyan)
        if (!name) return res.send("require param name")
        if (!fs.existsSync(path.join(__dirname, `./../bin_ok/${name}.js`))) return res.send("bin tidak tersedia")
        res.sendFile(path.join(__dirname, `./../bin_ok/${name}.js`))

    })

    app.post("/install", (req, res) => {
        console.log("install")
        res.sendFile(path.join(__dirname, "./../bin_ok/install.js"))
    })

    app.post("/build", (req, res) => {
        if (execSync(`hostname`).toString().trim() !== "srv442857") return res.send("hanya untuk lingkup server")
        // execSync(`git stash && git pull origin main && yarn install && node generate.js && pm2 restart wibudev_3004`, { stdio: "inherit" })
        const child = exec(`git stash && git pull origin main && yarn install && node generate.js && pm2 restart wibudev_3004`)
        // child.stdout.pipe(res)
        // child.stderr.pipe(res)

        // child.stderr.on("data", (data) => {
        //     console.log("std error".red, data)
        //     res.write(data.toString())
        // })

        child.stdout.on("data", (data) => {
            res.write(data.toString())
        })

        // child.on("error", (data) => {
        //     console.log("error", data.toString())
        //     res.write("child error")
        // })

        child.on("close", (a) => {
            res.end("SUCCESS")
        })

    })

    app.get('/assets/list-audience', (req, res) => {
        res.json(list_audience)
    })

    app.listen(sub['--port'], () => {
        console.log(`Server berjalan di port ${sub['--port']}`.green);
    });

}

main()
