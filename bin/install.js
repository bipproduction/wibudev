const { execSync } = require('child_process')
function main() {
    try {
        execSync("npm i -g papaparse")
        execSync("npm i -g lodash")
        execSync("npm i -g colors")
        execSync("npm i -g cross-fetch")
        execSync("npm i -g moment")
        console.log("success")
    } catch (error) {
        console.log("kegagalan dalam install ... hub developer")
    }
}

main()