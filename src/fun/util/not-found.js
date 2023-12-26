const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
require('colors')
const ascify = require('asciify')
ascify("WIBUDEV", { font: "Standard" }, (e, val) => console.log(val.cyan))
const loading = require('loading-cli')('loading ...').start();

module.exports = async function (param) {
    const com = param.bin.map((v) => [v])
    loading.stop()
    yargs(hideBin(process.argv))
        .command([...com])
        .version("1.0.0")
        .epilog("Beberapa Menu Masih Dalam Pengembangran".gray)
        .showHelp()

}