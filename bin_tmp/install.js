const root = require('child_process').execSync('npm root -g').toString().trim();
const { execSync } = require('child_process')
function main() {
    try {
        execSync("npm i -g papaparse", { stdio: "inherit" })
        execSync("npm i -g lodash", { stdio: "inherit" })
        execSync("npm i -g colors", { stdio: "inherit" })
        execSync("npm i -g cross-fetch", { stdio: "inherit" })
        console.log("success")
    } catch (error) {
        console.log("kegagalan dalam install ... hub developer")
    }
}

main()