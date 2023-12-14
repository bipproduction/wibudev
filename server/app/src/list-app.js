const { execSync } = require('child_process');
const columnify = require('columnify');
const colors = require('colors')


; (async () => {
    const config = JSON.parse(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/val/config').toString().trim())
    const url_host = config.dev? config.url_local: config.url_server

    const list_app = JSON.parse(execSync(`curl -s -o- -X POST ${url_host}/val/list-app`))
    console.log(columnify(list_app.map((v, k) => ({no: k+1, ...v}))).cyan)
})()