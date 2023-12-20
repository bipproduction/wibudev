const yargs = require('yargs')
module.exports = async (param) => {
    const arg = yargs
    .command("register")
    .scriptName("auth")
    .recommendCommands()
    .parse()

    console.log(param)
    // yargs.showHelp()
}
