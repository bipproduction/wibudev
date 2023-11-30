const prompts = require('prompts')
require('colors')
const { execSync } = require('child_process')
const _ = require('lodash')
const list_menu = [
    {
        title: "emotion generator",
        description: "otomatis generate emotion",
        value: "emo_gen",
        fun: () => {
            prompts([
                {
                    type: "text",
                    name: "negative",
                    message: "masukkan nilai negative"
                },
                {
                    type: "text",
                    name: "positive",
                    message: "masukkan nilai positive"
                },
                {
                    type: "text",
                    name: "neutral",
                    message: "masukkan nilai nneutral"
                },
                {
                    type: "text",
                    name: "file",
                    message: "masukkan nama file",
                }
            ]).then((val) => {
                if (_.values(val).includes("")) return console.log("tidak boleh kosong")
                try {
                    execSync(`curl -s -o- -N -X POST https://wibudev.wibudev.com/cmd/emotion-generator | node - --negative ${val.negative} --positive ${val.positive} --neutral ${val.neutral} --file ${val.file}`, { stdio: "inherit" })
                } catch (error) {
                    console.log("ERROR".red)
                }
            })

        }
    }
]

function main() {
    prompts({
        type: "select",
        message: "pilih menu",
        name: "menu",
        choices: list_menu
    }).then(({ menu }) => {
        if (!menu) return console.log("bye..".cyan)
        const app = list_menu.find((v) => v.value === menu)
        app.fun()
    })
}

main()