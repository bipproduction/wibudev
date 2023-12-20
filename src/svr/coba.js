const { execSync } = require('child_process');
const yargs = require('yargs');

; (async () => {
    const arg = yargs
        .options('nama')
        .parse()

    console.log(arg)
})()