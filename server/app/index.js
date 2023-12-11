const { execSync } = require('child_process');
const arg = process.argv.splice(2);
const host_name = execSync('hostname').toString().trim() === "srv442857"? "https://wibudev.wibudev.com": "http://localhost:3004"
// const config = JSON.parse(execSync(`curl -s -o- -X POST ${host_name}/json/config`).toString().trim());
// const url_host = config.is_dev ? config.host.local : config.host.server;

; (async () => {
    if (arg.length === 0) return console.log("require parameter")

    const root = require('child_process').execSync('npm root -g').toString().trim();
    const makuro_package = require(`${root}/makuro/package.json`);
    const dep = makuro_package.dependencies
    const dep_list = Object.keys(dep);
    const body = JSON.stringify({
        dep_list
    })

    try {
        execSync(`curl -s -o- -X POST -H "Content-Type: application/json" -d '${body}' ${host_name}/app/${arg[0]} | node - ${arg.splice(1).join(" ")}`, { stdio: "inherit" })
    } catch (error) {
        console.log(`=== ${arg[0]} ===`)
    }
})()