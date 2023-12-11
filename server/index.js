const arg = process.argv.splice(2);
const _ = require('lodash');
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
require('colors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const list_app = require('./json/app.json');
const { execSync } = require('child_process');
const curent_app = list_app.find((v) => v.name === "wibudev")
const _404 = path.join(__dirname, "./src/_404.js")
const body_parser = require('body-parser')
const JavaScriptObfuscator = require('javascript-obfuscator');

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/apa', (req, res) => {
    res.send(req.body)
})

app.get('/auth/:id', async (req, res) => {
    const id = +req.params.id
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return res.json({ auth: false })
    return res.json({ auth: true })
})

app.post('/login', async (req, res) => {
    const body = req.body
    const user = await prisma.user.findUnique({ where: { email: body.email } })
    if (!user || user.email !== body.email || user.password !== body.password) return res.json({ success: false })
    res.json({ success: true, userId: user.id })
})

app.post('/app', (req, res) => {
    res.sendFile(path.join(__dirname, "./app/index.js"))
})

app.post('/app/:name', (req, res) => {
    const { dep_list } = req.body
    const { name } = req.params

    const path_dir = path.join(__dirname, "./app/src")
    const dir = fs.readdirSync(path_dir)
    const file = dir.find((v) => v === `${name}.js`)
    if (!file) return res.status(404).sendFile(_404)
    let f = fs.readFileSync(`${path_dir}/${file}`).toString().trim()

    res.send(encrypt(f, dep_list))

})

app.post('/svr/:name', (req, res) => {
    const name = req.params.name
    if (!name) return res.status(404).send('404 | not found')
    const body = req.body
    const pt = path.join(__dirname, "./svr")
    const dir = fs.readdirSync(pt)
    const fl = dir.find((v) => v === `${name}.js`)
    if (!fl) return res.status(404).send("404 | not found")
    const child = execSync(`node ${pt}/${name}.js ${_.flatten(_.entries(body)).join(" ")}`).toString().trim()
    res.status(200).send(child)
})

app.post('/json/:name', (req, res) => {
    const { name } = req.params
    const path_dir = path.join(__dirname, "./json")
    if (!fs.existsSync(`${path_dir}/${name}.json`)) return res.status(404).end("404 | not found")
    const json = JSON.parse(fs.readFileSync(`${path_dir}/${name}.json`))
    res.status(200).json(json)
})

app.use((req, res) => {
    res.status(404).write("404 | not found")
    res.end()
})

app.listen(curent_app.port, () => console.log("server berjalan di port".green, curent_app.port))


// == fun

function encrypt(f, dep_list) {
    // menambahkan root require
    let root_target = `const root = require('child_process').execSync('npm root -g').toString().trim();\n`
    if (!f.includes(root_target)) {
        root_target += f
        f = root_target
    }

    for (let p of dep_list) {
        if (f.includes(`require('${p}')`)) {
            f = f.replace(`require('${p}')`, `require(\`\${root}/makuro/node_modules/${p}\`)`)
        }
    }
    return JavaScriptObfuscator.obfuscate(f, {
        compact: !![],
        controlFlowFlattening: !![],
        controlFlowFlatteningThreshold: 0x1,
        numbersToExpressions: !![],
        simplify: !![],
        stringArrayShuffle: !![],
        splitStrings: !![],
        stringArrayThreshold: 0x1
    }).getObfuscatedCode()
}