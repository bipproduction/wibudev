const root = require('child_process').execSync('npm root -g').toString().trim();
const { execSync } = require('child_process');
const arg = process.argv.splice(2);
const colors = require('colors');
const columnify = require('columnify');

; (async () => {
    const config = JSON.parse(execSync(`curl -s -o- -X POST https://wibudev.wibudev.com/val/config`))
    const host_name = config.dev ? config.url_local : config.url_server;
    if (arg.length === 0) {
        const list_app = JSON.parse(execSync(`curl -s -o- -X POST ${host_name}/val/available-app`).toString().trim())
        const ls = columnify(list_app.map((v) => ({ ["available-command"]: v.replace('.js', '').cyan })))
        return console.log(`${ls}`)
    }

    const makuro_package = require(`${root}/makuro/package.json`);
    const dep = makuro_package.dependencies
    const dep_list = Object.keys(dep);
    const body = JSON.stringify({
        dep_list
    })

    try {
        execSync(`curl -s -o- -X POST -H "Content-Type: application/json" -d '${body}' ${host_name}/app/${arg[0]} | node - ${arg.join(" ")}`, { stdio: "inherit" })
    } catch (error) {
        console.log(`=== ${arg[0]} ===`)
    }
})()