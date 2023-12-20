require('colors')
const express = require('express');
const app = express();
const list_app = require('./ast/apps.json');
const curent_app = list_app.find((v) => v.name === "wibudev");
const path = require('path')
const fs = require('fs')
const _ = require('lodash');
const { exec } = require('child_process');

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
    let config = require('./ast/config.json')

    if (!_.isEmpty(q)) {
        if (q.host_name !== "") {
            config.host_name = q.host_name
            console.log(config)
            fs.writeFileSync(path.join(__dirname, "./ast/config.json"), JSON.stringify(config, null, 2), "utf-8")
        }
    }

    res.json(require('./ast/config.json'))
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

    const child = exec(`node ${_pt}/${_file} ${_.flatten(_.entries(_body)).join(" ")}`)
    child.stdout.pipe(res)
    child.stderr.pipe(res)
})

app.listen(curent_app.port, () => console.log("server berjalan di port".green, curent_app.port));
