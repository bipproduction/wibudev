const express = require('express');
const { execSync, exec } = require('child_process');
const sub_arg = require('../sub_arg');
const arg = process.argv.splice(2)
const app = express();
const fs = require("fs")
const path = require('path')
require("colors")
const list_audience = require('./../assets/audience.json')
const _ = require('lodash')
const { box } = require('teeti')
const hostname = execSync(`hostname`).toString().trim()
const is_dev = hostname !== "srv442857"

// const help = `\n
// HELP:

// Install:
//     curl -s -o- -N -X POST https://wibude.wibudev.com/cmd/install | node

// Emotion Generator:
//     auto generate emotion sesuai dengan nilai akhir yang diinginkan , value setiap emotionnya akan menyesuaikan secara proposional
//     curl -s -o- -N -X POST https://wibude.wibudev.com/cmd/emotion-generator | node - --positive 60 --negative 30 --neutral 10 --file jokowi.csv

// Push Auto:
//     push perubahan project dilocal secara otomatis ke server sesuai branch yang sedang digunakan
//     curl -s -o- -N -X POST https://wibudev.wibudev.com/cmd/git | node - --push-auto

// == version 1.0.3 ==

// `
async function server() {
    const sub = sub_arg(['--port'], arg)
    if (!sub) return

    app.get("/", (req, res) => {
        res.write("MAKURO APP")
        res.end()
    })

    app.post('/cmd/:name', (req, res) => {
        const name = req.params.name
        const fl = is_dev ? path.join(__dirname, `./../bin/${name}.js`) : path.join(__dirname, `./../bin_ok/${name}.js`)
        if (!name) return res.send("require param name")
        if (!fs.existsSync(fl)) return res.sendFile(path.join(__dirname, "./../assets/not_found.js"))
        res.sendFile(fl)

    })

    app.post("/build", (req, res) => {
        try {
            if (execSync(`hostname`).toString().trim() !== "srv442857") return res.send("hanya untuk lingkup server")
            const child = exec(`git stash && git pull origin main && yarn install && pm2 restart wibudev_3004`)
            child.stdout.pipe(res)
            child.stderr.pipe(res)

            child.on("close", (a) => {
                res.end("SUCCESS")
            })
        } catch (error) {
            res.end(error)
        }

    })

    app.get("/fun/:name", (req, res) => {
        const name = req.params.name
        if (!name) return res.status(404).send("not found | 404")
        const ada = fs.existsSync(path.join(__dirname, `./fun/${name}.js`))
        if (!ada) return res.status(404).send("not found | 404")
        res.sendFile(path.join(__dirname, `./fun/${name}.js`))
    })

    app.get("/json/:name", (req, res) => {
        const name = req.params.name
        if (!name) return res.status(404).send("not found | 404")
        const ada = fs.existsSync(path.join(__dirname, `./json/${name}.json`))
        if (!ada) return res.status(404).send("not found | 404")
        const fl = JSON.parse(fs.readFileSync(path.join(__dirname, `./json/${name}.json`)).toString().trim())
        res.json(fl)
    })

    app.get("/val/:name", (req, res) => {
        const name = req.params.name
        if (!name) return res.status(404).send("not found | 404")
        const ada = fs.existsSync(path.join(__dirname, `./val/${name}.js`))
        if (!ada) return res.status(404).send("not found | 404")
        const data = JSON.parse(execSync(`node ${path.join(__dirname, `./val/${name}.js`)}`).toString().trim())
        res.json(data)
    })

    app.get('/svr/:name', (req, res) => {
        const name = req.params.name
        const arg = !_.isEmpty(req.query) ? req.query.arg.split('/').join(' ') : null

        const ada = fs.existsSync(path.join(__dirname, `./src/${name}.js`))
        if (!ada) {
            res.status(404).send(`${box("not available | 404")}\n`)
            return res.end()
        }

        const child = exec(`node ${path.join(__dirname, `./svr/${name}.js ${arg ?? ''}`)}`)
        child.stdout.pipe(res)
        child.stderr.pipe(res)
    })



    // app.get('/assets/:name', (req, res) => {
    //     try {
    //         const name = req.params.name
    //         res.sendFile(path.join(__dirname, `./../assets/${name}`))
    //     } catch (error) {
    //         res.status(404).end("404 | NOT FOUND")
    //     }
    // })

    app.get('/list-app', (req, res) => {
        const dir = fs.readdirSync(path.join(__dirname, "./../bin_ok"))
        res.json(dir.map((v) => v.replace(".js", "")))
    })

    app.listen(sub['--port'], () => {
        console.log(`Server berjalan di port ${sub['--port']}`.green);
    });

}

module.exports = server

