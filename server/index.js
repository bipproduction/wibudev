const express = require('express');
const { execSync, exec } = require('child_process');
const sub_arg = require('../sub_arg');
const arg = process.argv.splice(2)
const app = express();
const fs = require("fs")
const path = require('path')
require("colors")
const list_audience = require('./../assets/audience.json')

const help = `\n
HELP:

Install:
    curl -s -o- -N -X POST https://wibude.wibudev.com/cmd/install | node
  
Emotion Generator:
    auto generate emotion sesuai dengan nilai akhir yang diinginkan , value setiap emotionnya akan menyesuaikan secara proposional
    curl -s -o- -N -X POST https://wibude.wibudev.com/cmd/emotion-generator | node - --positive 60 --negative 30 --neutral 10 --file jokowi.csv

Push Auto:
    push perubahan project dilocal secara otomatis ke server sesuai branch yang sedang digunakan
    curl -s -o- -N -X POST https://wibudev.wibudev.com/cmd/git | node - --push-auto

== version 1.0.3 ==

`
async function main() {
    const sub = sub_arg(['--port'], arg)
    if (!sub) return

    app.get("/", (req, res) => {
        res.write(help)
        res.end()
    })

    app.post('/cmd/:name', (req, res) => {
        const name = req.params.name
        console.log("cmd", name.cyan)
        if (!name) return res.send("require param name")
        if (!fs.existsSync(path.join(__dirname, `./../bin_ok/${name}.js`))) return res.send("bin tidak tersedia")
        res.sendFile(path.join(__dirname, `./../bin_ok/${name}.js`))

    })

    app.post("/build", (req, res) => {
        try {
            if (execSync(`hostname`).toString().trim() !== "srv442857") return res.send("hanya untuk lingkup server")
            const child = exec(`git stash && git pull origin main && yarn install && node generator.js && pm2 restart wibudev_3004`)
            child.stdout.pipe(res)
            child.stderr.pipe(res)

            child.on("close", (a) => {
                res.end("SUCCESS")
            })
        } catch (error) {
            res.end(error)
        }

    })

    app.get('/assets/list-audience', (req, res) => {
        res.json(list_audience)
    })

    app.get('/assets/:name', (req, res) => {
        try {
            const name = req.params.name
            res.sendFile(path.join(__dirname, `./../assets/${name}`))
        } catch (error) {
            res.status(404).end("404 | NOT FOUND")
        }
    })


    app.listen(sub['--port'], () => {
        console.log(`Server berjalan di port ${sub['--port']}`.green);
    });

}


main()
