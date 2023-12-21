const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
require('colors')

module.exports = async function (param) {
    const com = param.bin.map((v) => [v])
    yargs(hideBin(process.argv))
        .command([...com])
        .version("1.0.0")
        .epilog("Beberapa Menu Masih Dalam Pengembangran".cyan)
        .showHelp()
}