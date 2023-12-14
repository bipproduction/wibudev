const { program } = require('commander');
const { execSync } = require('child_process');
const columnify = require('columnify');
const color = require('colors');
const _ = require('lodash')

; (async () => {
    program
        .option('-g, --get', '')
        .option('-s, --set <boolean>', 'set mode to dev or prod')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    if(_.isEmpty(opt)) return program.help()

    const config = JSON.parse(execSync('https://wibudev.wibudev.com/'))
    const url_host = config.url_server

    if (opt.get) {
        console.log(columnify(config))
        return
    }

    if (opt.set !== undefined) {
        const dev = opt.set === "true"
        const apa = execSync(`curl -s -o- -X POST -H "Content-Type: application/json" -d '{"-s": ${dev}}' POST ${url_host}/svr/config`).toString().trim()
        console.log(columnify(JSON.parse(apa)))
    }
})()