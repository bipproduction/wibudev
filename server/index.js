const express = require('express');
const { execSync } = require('child_process');
const sub_arg = require('../sub_arg');
const arg = process.argv.splice(2)
const app = express();
const fs = require("fs")
const path = require('path')
require("colors")

execSync(`node ${path.join(__dirname, "./../generate.js")}`, { stdio: "inherit" })

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


    app.listen(sub['--port'], () => {
        console.log(`Server berjalan di port ${sub['--port']}`.green);
    });

}

main()
