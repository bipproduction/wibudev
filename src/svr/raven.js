const { spawn } = require('child_process')
const path = require('path')
const arg = process.argv.splice(2)
console.log(arg)

const yargs = require("yargs")
const argv = yargs.parse(arg)


const dir = argv.T ? "test-raven-stone2" : "raven-stone2"
const child = spawn('/bin/bash', ['-c', `cd ${path.join(__dirname, `./../../../${dir}`)} && cat ${path.join(__dirname, "./_raven.js")} | node - ${arg.join(" ")}`])
child.stdout.on("data", data => console.log(data.toString()))
child.stderr.on("data", data => console.log(data.toString()))
