const { spawn } = require('child_process')
const path = require('path')
const arg = process.argv.splice(2)

// console.log(arg.join(" "))

const child = spawn('/bin/bash', ['-c', `cd ${path.join(__dirname, "./../../../raven-stone2")} && cat ${path.join(__dirname, "./_raven.js")} | node - ${arg.join(" ")}`])
child.stdout.on("data", data => console.log(data.toString()))
child.stderr.on("data", data => console.log(data.toString()))
