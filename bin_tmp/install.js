const root = require('child_process').execSync('npm root -g').toString().trim();
const { execSync } = require('child_process')
const host_name = require("child_process").execSync('hostname').toString().trim()
const list_package = ["papaparse", "lodash", "colors", "cross-fetch", "moment", "ip", "prompts", "columnify"]

function main() {
    try {
        for (let p of list_package) {
            execSync(`npm i -g ${p}`)
        }
        console.log("success")
    } catch (error) {
        console.log("kegagalan dalam install ... hub developer")
    }
}

main()