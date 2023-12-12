const { program } = require('commander');
const _ = require('lodash');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const url_host = execSync('hostname').toString().trim() === "srv442857" ? "https://wibudev.wibudev.com" : "http://localhost:3004";

; (() => {
    program
        .version("1.0.0")
        .requiredOption('-n, --name <string>', 'nama app [hipmi, ninox ...]')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    const name = opt.name

    const body = JSON.stringify({
        ['-n']: name
    })
    execSync(`curl -s -o- -X POST -H "Content-type: application/json" -d '${body}' ${url_host}/svr/build`, { stdio: "inherit" })

})()    