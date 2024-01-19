const yargs = require('yargs')
const fun_url = require('require-from-url/sync')

module.exports = async function (param) {
    yargs
        .scriptName("stream")
        .command(
            "screen",
            "stream screen",
            yargs => yargs,
            fun_url(`${param.url}/req-fun/stream/screen`)
        )
        .command(
            "camera",
            "stream camera",
            yargs => yargs,
            fun_url(`${param.url}/req-fun/stream/camera`)
        )
        .showHelpOnFail()
        .recommendCommands()
        .demandCommand(1)
        .parse(process.argv.splice(3))
}