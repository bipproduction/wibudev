const { program } = require('commander');
const { execSync } = require('child_process');
const dev = (execSync(`curl -s -o- https://wibudev.wibudev.com/dev`).toString().trim() === "true");


; (() => {

    program
        .requiredOption('-sd, --set-dev <boolean>', 'set mode to dev or prod')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opts = program.opts()
    execSync(`curl -s -o- https://`)

})()