const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
require('colors')

module.exports = async function (param) {
    console.log(param)
    yargs(hideBin(process.argv))
        .command(['git'])
        .version("1.0.0")
        .showHelp()
}