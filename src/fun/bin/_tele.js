const yargs = require('yargs')
const session = "1BQANOTEuMTA4LjU2LjIwMAG7Jp5etxoyjQT4dJepKbkz4w/UwASqJL79sTnTWkW5zXFALdLOyBxTQUe0/fS783MSREDcToVBGO4umEyB+bnaKOtIQwNPMj18SHXqHJ0B6rdNrxBtJte1KGUjxtn4Uf6s1JCqpda+ynlcFVQffipOWhtpd1i3K5w44OI9RvLz/rXxhRhy0H5YPv2auzmvTVamZ0JkS8IRcUCVx8sQgtvGVclYlEoVcyekUDbSUBOI+0Bb+8VKDSrCC1Lvi6RNCBnEqeqrkqOkNoibvbfebxj9eKgkvjSSjVA2BD82COS9iJSoI4xKpKG1lRXqEP5wSaSADpiibPUkvRflS1Oi9KGsCA=="
const apiId = 29857494
const apiHash = '1a17e1ef6d9b6106e8d43692b0b87fe8'
const { TelegramClient, Logger } = require('telegram')
const { StringSession } = require('telegram/sessions')
const stringSession = new StringSession(session);
const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5, baseLogger: new Logger("error") })
client.logger.setLevel(12)
const fs = require('fs')
const loading = require('loading-cli')('telegram loading ...')

module.exports = async function (param) {

    yargs
        // .command(
        //     "auth",
        //     "login ke telegram",
        //     yargs => yargs
        //     , funAuth
        // )
        .command(
            "msg",
            "m",
            yargs => yargs
                .options({
                    "number": {
                        alias: "n",
                        desc: "nomer tujuan ex: +628969...",
                        string: true,
                        demandOption: true
                    },
                    "text": {
                        alias: "t",
                        desc: "isi dari pesan",
                        string: true,
                        demandOption: true
                    }
                })
            , funMsg
        )
        .command(
            "fl",
            "kirim file",
            yargs => yargs
                .options({
                    "number": {
                        alias: "n",
                        desc: "nomer tujuan ex: +628969...",
                        string: true,
                        demandOption: true
                    },
                    "file": {
                        alias: "f",
                        desc: "path file",
                        string: true,
                        demandOption: true
                    }
                }),
            funFile
        )
        .recommendCommands()
        .demandCommand(1)
        .parse(process.argv.splice(3))
}

// async function funAuth(argv) {

// }

async function funMsg(argv) {
    await client.connect()
    const kirim = await client.sendMessage(argv.n, { message: argv.t })
    console.log(kirim.date.toString(), "success")
    client.disconnect()
}

async function funFile(argv) {
    try {
        if (!fs.existsSync(argv.f)) return console.log("no file ")
        await client.connect()
        const kirim = await client.sendFile(argv.n, {
            file: argv.f, progressCallback: (v) => {
                loading(`${v} ...`)
            }
        })
        console.log(kirim.file.name, "success")
    } catch (error) {
        console.log(error.message)
    } finally {
        await client.disconnect()
        loading.stop()
    }

}

