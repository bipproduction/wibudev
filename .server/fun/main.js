const { program } = require('commander');
const _ = require('lodash');
const url = "http://localhost:3004"

const list_app = [
    {
        name: "app_1"
    },
    {
        name: "app_2"
    }
]
module.exports = async (param) => {
    program
        .argument(`app <require>`, `nama app: \n${list_app.map((v) =>v.name).join(", ")}`)
        .action(function (a, b) {
            try {
                require('require-from-url/sync')(`${url}/fun/bin/${a}`)()
            } catch (error) {
                console.log("error | no internet connection")
            }
        })
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()
}
