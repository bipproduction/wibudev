const _ = require('lodash')
const yargs = require('yargs')
module.exports = async function (param) {

    const args = yargs
        .scriptName("git")
        .command("push")
        .command('pull')
        .version("1.0.0")
        .parse()

    if(args._[1] === "push"){

        return
    }

    if(args._[1] === "pull"){

        return
    }

    yargs.showHelp()


}