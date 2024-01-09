const { spawn } = require('child_process')
const path = require('path')
const arg = process.argv.splice(2)


const yargs = require("yargs")
const argv = yargs.parse(arg)


const dir = Boolean(argv.T) ? "test-raven-stone2" : "raven-stone2"
console.log(dir)
const child = spawn('/bin/bash', ['-c', `cd ${path.join(__dirname, `./../../../${dir}`)} && cat ${path.join(__dirname, "./_raven.js")} | node - ${arg.join(" ")}`])
child.stdout.on("data", data => console.log(data.toString()))
child.stderr.on("data", data => console.log(data.toString()))
