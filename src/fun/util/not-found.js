const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
require('colors')

const ascify = require('asciify')
ascify("WIBUDEV", {font: "Standard"}, (e, val) => console.log(val.cyan))

module.exports = async function (param) {
    const com = param.bin.map((v) => [v])
    yargs(hideBin(process.argv))
        .command([...com])
        .version("1.0.0")
        .epilog("Beberapa Menu Masih Dalam Pengembangran".gray)
        .showHelp()
}