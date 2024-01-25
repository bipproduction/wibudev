
const _ = require('lodash')
const yargs = require('yargs')
const { execSync } = require('child_process')
const path = require('path')
require('colors')
const loading = require('loading-cli')('raven ...').start()

module.exports = async function (param) {

    loading.stop()
    yargs
        .scriptName("raven")
        .command(
            "cal", 
            "menampilkan calendar", 
            yargs => yargs
            .option({
                "month": {
                    alias: "m",
                    string: true,
                    desc: "date "
                },
                "year": {
                    alias: "y",
                    string: true,
                    desc: "date"
                }
            }), (arg) => cal(arg, param))
        .command(
            "mpe", 
            `manipulate paslon emotion, mengkopi dari tanggal source lalu dimanipulasi dan di terapkan ke tanggal target`, 
            yargs => yargs
            .options({
                "from": {
                    alias: "f",
                    string: true,
                    desc: "date",
                    demandOption: true
                },
                "to": {
                    alias: "t",
                    string: true,
                    desc: "date",
                    demandOption: true
                },
                "paslon-id": {
                    alias: "P",
                    number: true,
                    desc: "1 ...",
                    demandOption: true
                },
                "positive": {
                    alias: "p",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "negative": {
                    alias: "n",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "neutral": {
                    alias: "l",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "copy": {
                    alias: "C",
                    desc: "jika aktifitasnya adalah copy",
                    boolean: true,
                    default: false
                },
                "test": {
                    alias: "T",
                    boolean: true,
                    desc: "default pada app branch test ?? build",
                    default: true
                }
            })
            .example(`[test] $0 mpe -f "2023-12-23" -t "2024-01-01" -P 1 -p 10 -n 10 -l 80`)
            .example(`[build] tambahkan T false`)
            .epilog("negative, positive, neutral total harus bernilai 100")
            , arg => mpe(arg, param)
        )
        .command(
            "mpeh", 
            "manipulate paslon by time, atau berdasarkan jam, dan tanggal bebas", 
            yargs => yargs
            .options({
                "date-from": {
                    alias: "d",
                    string: true,
                    desc: "[date] tanggal source",
                    demandOption: true
                },
                "date-to": {
                    alias: "D",
                    string: true,
                    desc: "[date] tanggal target ",
                    demandOption: true
                },
                "paslon-id": {
                    alias: "P",
                    number: true,
                    desc: "1 ...",
                    demandOption: true
                },
                "positive": {
                    alias: "p",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "negative": {
                    alias: "n",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "neutral": {
                    alias: "l",
                    number: true,
                    desc: "0-100",
                    demandOption: true
                },
                "hour-from": {
                    alias: "h",
                    string: true,
                    desc: "[00] jam source",
                    demandOption: true
                },
                "hour-to": {
                    alias: "H",
                    string: true,
                    desc: "[00] jam target",
                    demandOption: true
                },
                "test": {
                    alias: "T",
                    boolean: true,
                    desc: "default pada app branch test ?? build",
                    default: true
                }
            })
            .example(`[test] $0 mpeh -d "2023-12-23" -D "2023-12-23" -P 1 -p 20 -n 20 -l 60 -h 15 -H 18`)
            .example(`[build] tambahkan T false`)
            .epilog("negative, positive, neutral total harus bernilai 100"), (arg) => mpeh(arg, param))
        .command(
            "cp",
            "copy data",
            yargs => yargs
                .options({
                    "paslonA": {
                        alias: "p",
                        desc: "paslon id A source",
                        number: true,
                        demandOption: true
                    },
                    "paslonB": {
                        alias: "P",
                        desc: "paslon id B target",
                        number: true,
                        demandOption: true
                    },
                    "dateA": {
                        alias: "d",
                        desc: "tanggal A source",
                        string: true,
                        demandOption: true
                    },
                    "dateB": {
                        alias: "D",
                        desc: "tanggal B target",
                        string: true,
                        demandOption: true
                    },
                    "test": {
                        alias: "T",
                        boolean: true,
                        desc: "default pada app branch test ?? build",
                        default: true
                    },
                    "force": {
                        alias: "f",
                        boolean: true,
                        desc: "force atau paksa",
                        default: false
                    },
                })
                .example('[test branch] $0 cp -p 1 -P 2 -d 2023-12-26 -D 2023-12-27')
                .example(`[build branch] raven cp -p 1 -P 2 -d 2023-12-26 -D 2023-12-27 -T false`),
            argv => funCopy(argv, param)
        )
        .command(
            "del",
            "delete paslon enotion",
            yargs => yargs
                .options({
                    "date": {
                        alias: "d",
                        desc: "tangga",
                        string: true,
                        demandOption: true
                    },
                    "paslonId": {
                        alias: "p",
                        desc: "paslon id",
                        string: true,
                        demandOption: true
                    },
                    "time": {
                        alias: "t",
                        desc: "[00] jam nya , jika null maka sesuai tanggal",
                        default: null,
                        string: true
                    },
                    "test": {
                        alias: "T",
                        boolean: true,
                        desc: "default pada app branch test ?? build",
                        default: true
                    }
                })
                .example(`[test] $0 del -d 2023-12-22 -p 1`)
                .example(`[del by time / jam] $0 del -d 2023-12-22 -p 1 -t 10 `)
                .example(`[build] tambahkan T false`),
            argv => funDel(argv, param))
        .showHelpOnFail()
        .recommendCommands()
        .demandCommand(1, 'pilih salah satu command yang tersedia')
        .epilog("require package yargs columnify loading-cli")
        .help()
        .parse(process.argv.splice(3))

}

async function cal(arg, param) {
    if (arg.month && arg.year && arg.month !== "" && arg.year !== "") return execSync(`cal ${arg.month} ${arg.year}`, { stdio: "inherit" })
    execSync('cal', { stdio: "inherit" })
}


async function mpe(arg, param) {
    loading.stop()
    const res = await fetch(`${param.url}/svr/raven`, {
        method: "POST",
        body: JSON.stringify({
            "mpe": "",
            "-f": arg.f,
            "-t": arg.t,
            "-P": arg.P,
            "-p": arg.p,
            "-n": arg.n,
            "-l": arg.l,
            "-C": arg.c,
            "-T": arg.T

        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const text = await res.text()
    console.log(text)
}

async function mpeh(arg, param) {
    loading.stop()
    const res = await fetch(`${param.url}/svr/raven`, {
        method: "POST",
        body: JSON.stringify({
            "mpeh": "",
            "-d": arg.d,
            "-D": arg.D,
            "-P": arg.P,
            "-p": arg.p,
            "-n": arg.n,
            "-l": arg.l,
            "-h": arg.h,
            "-H": arg.H,
            "-T": arg.T
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const text = await res.text()
    console.log(text)
}

async function funCopy(arg, param) {
    loading.stop()
    const res = await fetch(`${param.url}/svr/raven`, {
        method: "POST",
        body: JSON.stringify({
            "cp": "",
            "-p": arg.p,
            "-P": arg.P,
            "-d": arg.d,
            "-D": arg.D,
            "-T": arg.T,
            "-f": arg.f
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const text = await res.text()
    console.log(text)
}

async function funDel(argv, param) {
    const res = await permintaan({
        "del": "",
        "-d": argv.d,
        "-p": argv.p,
        "-t": argv.t,
        "-T": argv.T
    }, param)

    console.log(res)
}

async function permintaan(body, param) {
    const res = await fetch(`${param.url}/svr/raven`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const text = await res.text()
    return text
}
