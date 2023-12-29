require('colors')
const express = require('express');
const app = express();
const list_app = require('./ast/apps.json');
const curent_app = list_app.find((v) => v.name === "wibudev");
const path = require('path')
const fs = require('fs')
const _ = require('lodash');
const { exec, spawn } = require('child_process');

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/fun', (req, res) => {
    const _f = fs.readFileSync(path.join(__dirname, "./fun/index.js"))
    res.setHeader('Content-Type', 'text/javascript');
    res.send(_f)
})

app.get('/fun/:name', (req, res) => {
    const _name = req.params.name
    const _path = path.join(__dirname, "./fun/bin")
    const _dir = fs.readdirSync(_path)
    const _file = _dir.find((v) => v === `${_name}.js`)
    res.setHeader('Content-Type', 'text/javascript');
    if (!_file) return res.sendFile(path.join(__dirname, "./fun/util/not-found.js"))
    const _f = fs.readFileSync(`${_path}/${_file}`)
    return res.send(_f)
})

app.get("/config", (req, res) => {
    const q = req.query
    if (!_.isEmpty(q)) {
        let config = require('./ast/config.json')
        if (q.host_name !== "") {
            config.host_name = q.host_name
            console.log(config)
            fs.writeFileSync(path.join(__dirname, "./ast/config.json"), JSON.stringify(config, null, 2), "utf-8")
        }
    }

    const c = require('./ast/config.json')
    const bin = fs.readdirSync(path.join(__dirname, "./fun/bin")).filter((v) => !_.startsWith(v, "_")).map((v) => v.replace(".js", ""))
    const apps = require("./ast/apps.json")
    c.bin = bin
    c.apps = apps
    res.json(c)
})

app.post('/auth/:param?', (req, res) => {
    const param = req.params.param
    const body = req.body

    if (param === "register") {
        if (!body.host_name) return res.json({
            success: false,
            message: "no hostname"
        })
        const config = require('./ast/config.json')
        if (config.users.includes(body.host_name)) return res.json({
            success: false,
            message: "user sudah terdaftar"
        })

        config.users.push(body.host_name)
        fs.writeFileSync(path.join(__dirname, "./ast/config.json"), JSON.stringify(config, null, 2), "utf-8")

        return res.json({
            success: true,
            message: "pendaftaran user success"
        })
    }

    res.send("AUTH")
})

app.post('/svr/:param?', async (req, res) => {
    const _param = req.params.param ?? null
    const _body = req.body

    const _pt = path.join(__dirname, "./svr")
    const _dir = fs.readdirSync(_pt)
    const _file = _dir.find((v) => v.replace(".js", "") === _param)
    if (!_file) {
        return res.end("404 | file not found")
    }

    const child = spawn('/bin/sh', ['-c', `node ${_pt}/${_file} ${_.flatten(_.entries(_body)).join(" ")}`])
    child.stdout.pipe(res)
    child.stderr.pipe(res)
})


app.post('/svr2/:name?', (req, res) => {
    const name = req.params.name ?? null
    const body = req.body
    const _pt = path.join(__dirname, "./svr2")
    const _dir = fs.readdirSync(_pt)
    const file = _dir.find((v) => v.replace(".js", "") === name)
    if (!file) {
        return res.end("404 | file not found")
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');

    const child = require(`${_pt}/${file}`)(body)
    child.stdout.pipe(res)
    child.stderr.pipe(res)

})


app.get('/db-download/:name?', (req, res) => {
    const name = req.params.name
    if (!name || name === "") return res.send("require name")
    const pt = path.join(__dirname, "./db_backup")
    const dr = fs.readdirSync(pt)
    const fl = dr.find((v) => v === name)
    if (!fl) return res.send("no file availabele")
    res.sendFile(`${pt}/${fl}`)
})

app.get('/val/:name?', async (req, res) => {
    const name = req.params.name
    if (!name || name === "") return res.json({ success: false, message: 404, data: null })
    const _pt = path.join(__dirname, "./val")
    const ada = fs.existsSync(`${_pt}/${name}.js`)
    if (!ada) return res.json({ success: false, message: "no file", data: null })
    const fl = await (require(`${_pt}/${name}.js`)())
    return res.json({
        success: true,
        message: "success",
        data: fl
    })
})


// BIP
app.get('/bip/json/:name?', (req, res) => {
    const name = req.params.name
    if (!name) return res.json({ success: false, message: "no name", data: null })
    const dir_string = path.join(__dirname, "./bip/json")
    const list_file = fs.readdirSync(dir_string)
    const file = list_file.find((v) => v === `${name}.json`)
    if (!file) return res.json({ success: false, message: "no file", data: null })
    const curent_file = fs.readFileSync(`${dir_string}/${file}`)
    res.json(JSON.parse(curent_file))
})

app.get('/bip/fun/:name', (req, res) => {
    const _name = req.params.name
    const _path = path.join(__dirname, "./bip/fun")
    const _dir = fs.readdirSync(_path)
    const _file = _dir.find((v) => v === `${_name}.js`)
    res.setHeader('Content-Type', 'text/javascript');
    if (!_file) return res.sendFile(path.join(__dirname, "./bip/_404.js"))
    const _f = fs.readFileSync(`${_path}/${_file}`)
    return res.send(_f)
})

app.listen(curent_app.port, () => console.log("server berjalan di port".green, curent_app.port));
