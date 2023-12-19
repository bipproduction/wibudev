require('colors')
const express = require('express');
const app = express();
const list_app = require('./ast/apps.json');
const curent_app = list_app.find((v) => v.name === "wibudev");
const path = require('path')
const fs = require('fs')

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
    const config = require('./ast/config.json')
    res.json(config)
})

app.listen(curent_app.port, () => console.log("server berjalan di port".green, curent_app.port));
