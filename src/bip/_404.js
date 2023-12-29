const yargs = require('yargs')
module.exports = async function (param) {
    const arg = yargs
        .command('emotion')
        .showHelp()
        .argv
}