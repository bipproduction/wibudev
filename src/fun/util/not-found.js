const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
require('colors')
module.exports = async function () {
    yargs(hideBin(process.argv))
    .command("db")
    .command("git")
    .version("1.0.0")
    .showHelp()
}