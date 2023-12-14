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
const { execSync, exec } = require('child_process');
const curent_app = list_app.find((v) => v.name === "wibudev")
const _404 = path.join(__dirname, "./src/_404.js")
const JavaScriptObfuscator = require('javascript-obfuscator');
const columnify = require('columnify');
const { box } = require('teeti')

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {

    const _dev = await prisma.config.findUnique({ where: { id: 1 } })
    const user = await prisma.user.findMany()
    const package = require('./../package.json')
    const app = require('./json/app-list.json')
    res.send(`
<html>
<head></head>
<body style="height: 100vh; width: 100%; background-color: black; color: grey">
<pre>
<h1>Wibudev App:</h1>
${box(columnify(user), { padding: 1, title: "USER" })}
${box(columnify(package))}
${box(columnify(app))}
Mode:
${_dev.dev ? "Mode Dev" : "Mode Production"}
</pre>
<body>
</html>
`,)
})

app.get('/dev', async (req, res) => {
    let val_dev = req.query.set_dev
    let is_dev = true
    if (val_dev) {
        val_dev = val_dev === "true"
        console.log(val_dev)
        const dev = await prisma.dev.upsert({
            where: {
                id: 1
            },
            create: {
                dev: val_dev
            },
            update: {
                dev: val_dev
            }
        })

        is_dev = dev.dev

    }

    const _dev = await prisma.dev.findUnique({ where: { id: 1 } })
    res.send(_dev.dev)
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
    const { dep_list } = req.body
    const file = fs.readFileSync(path.join(__dirname, "./app/index.js")).toString().trim()
    const man = manipulate(file, dep_list)
    const enc = encrypt(man)
    res.send(enc)
})

app.post('/app/:name', (req, res) => {
    const { dep_list } = req.body
    const { name } = req.params
    const path_dir = path.join(__dirname, "./app/src")
    const dir = fs.readdirSync(path_dir)
    const file = dir.find((v) => v === `${name}.js`)
    if (!file) return res.status(404).sendFile(_404)
    let f = fs.readFileSync(`${path_dir}/${file}`).toString().trim()
    const ff = manipulate(f, dep_list)
    const enc = encrypt(ff)
    res.send(enc)
})

app.post('/svr/:name', (req, res) => {
    const name = req.params.name
    if (!name) return res.status(404).send('404 | not found')
    const body = req.body
    const pt = path.join(__dirname, "./svr")
    const dir = fs.readdirSync(pt)
    const fl = dir.find((v) => v === `${name}.js`)
    if (!fl) return res.status(404).send("404 | not found")
    const child = exec(`node ${pt}/${name}.js ${_.flatten(_.entries(body)).join(" ")}`)
    child.stdout.pipe(res)
    child.stderr.pipe(res)
})

app.post('/val/:name', async (req, res) => {
    const name = req.params.name
    const body = req.body
    const p = path.join(__dirname, "./val")
    const dir = fs.readdirSync(p)
    const fl = dir.find((v) => v.replace(".js", "") === name)
    if (!fl) return res.status(404).send(box("404 | not found"))
    const app = await require(`${p}/${fl}`)(body)
    res.status(200).send(app)

})

app.post('/json/:name', (req, res) => {
    const { name } = req.params
    const path_dir = path.join(__dirname, "./json")
    if (!fs.existsSync(`${path_dir}/${name}.json`)) return res.status(404).end("404 | not found")
    const json = JSON.parse(fs.readFileSync(`${path_dir}/${name}.json`))
    res.status(200).json(json)
})

app.use((req, res) => {
    res.status(404).write("404 | no route")
    res.end()
})

app.listen(curent_app.port, () => console.log("server berjalan di port".green, curent_app.port))


// == fun

function manipulate(f, dep_list) {
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
    return f
}

function encrypt(f) {
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