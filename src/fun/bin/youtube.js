const yargs = require('yargs');
const fun_url = require('require-from-url/sync');
var up;

module.exports = async function (param) {

    up = (await import('log-update')).default
    yargs
        .command(
            "youtube",
            "streaming youtube",
            yargs => yargs,
            fun_url(`${param.url}/req-fun/youtube/youtube-stream`)
        )
        .command(
            "set-key",
            "set key stream",
            yargs => yargs
                .options({
                    "key": {
                        alias: "k",
                        desc: "youtube stream key",
                        string: true,
                        demandOption: true
                    }
                }),
            fun_url(`${param.url}/req-fun/youtube/set-key`)
        )
        .command(
            "file-video",
            "stream dari file video",
            yargs => yargs
                .options({
                    "file": {
                        alias: "f",
                        desc: "nama dari file",
                        demandOption: true,
                        string: true
                    }
                }),
            fun_url(`${param.url}/req-fun/youtube/file-video`)
        )
        .command(
            "screen",
            "menangkap tangkapan layar",
            yargs => yargs,
            fun_url(`${param.url}/req-fun/youtube/screen`)
        )
        .command(
            "camera",
            "menangkap tangkapan camera",
            yargs => yargs,
            fun_url(`${param.url}/req-fun/youtube/camera`)
        )
        .options({
            "data": {
                alias: "d",
                default: {
                    url: param.url,
                    db_dir: param.db_dir
                },
                hidden: true
            }
        })
        .showHelpOnFail()
        .demandCommand(1)
        .recommendCommands()
        .help()
        .version()
        .parse(process.argv.splice(3))
}
