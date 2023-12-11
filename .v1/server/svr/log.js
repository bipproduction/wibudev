const arg = process.argv.splice(2);
const { exec } = require('child_process');
const _ = require('lodash');

; (() => {
    if (_.isEmpty(arg)) return console.log("param require")
    const child = exec(`pm2 log ${arg[0]}`)
    child.stdout.on('data', console.log)
    child.stderr.on('data', console.log)
    child.on('error', console.log)
    setTimeout(() => { child.kill() }, 5000)
})()