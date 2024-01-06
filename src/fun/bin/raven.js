
const _ = require('lodash')
const yargs = require('yargs')
const { execSync, exec, spawn } = require('child_process')
const path = require('path')
require('colors')
const loading = require('loading-cli')('raven ...').start()

module.exports = async function (param) {

    loading.stop()
    yargs
        .scriptName("raven")
        // .command("lp", "menampilkan list paslon", yargs => yargs, listPaslon)
        .command("cal", "menampilkan calendar", yargs => yargs
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
        .command("mpe", `manipulate paslon emotion, mengkopi dari tanggal source lalu dimanipulasi dan di terapkan ke tanggal target`, yargs => yargs
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
        .command("mpeh", "manipulate paslon by time, atau berdasarkan jam, dan tanggal bebas", yargs => yargs
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

// async function generate(file_json, param) {
//     const list_audience = await fetch(`https://wibudev.wibudev.com/bip/json/audience`).then((v) => v.json()).then((v) => v)

//     const hasil = []
//     for (let fj of file_json) {
//         const gen = perhitungan(param, fj, list_audience)
//         hasil.push(gen)
//     }

//     const _positive = +_.sum([_.sumBy(hasil, (v) => v.confidence), _.sumBy(hasil, (v) => v.supportive), _.sumBy(hasil, (v) => v.positive)])
//     const _negative = +_.sum([_.sumBy(hasil, (v) => v.unsupportive), _.sumBy(hasil, (v) => v.uncomfortable), _.sumBy(hasil, (v) => v.negative), _.sumBy(hasil, (v) => v.dissapproval)])
//     const _neutral = +_.sum([_.sumBy(hasil, (v) => v.undecided)])

//     const _total = _.sum([_positive, _negative, _neutral])

//     const _per = {
//         positive: _.round((_positive / _total) * 100, 2),
//         negative: _.round((_negative / _total) * 100, 2),
//         neutral: _.round((_neutral / _total) * 100, 2)
//     }

//     return hasil
// }

// function perhitungan(param, data, list_audience) {

//     const total = list_audience.find((v) => +v.idProvinsi === +data.idProvinsi && +v.idKabkot === +data.idKabkot).value
//     const result = {}
//     result.positive = (param.positive / 100) * total;
//     result.negative = (param.negative / 100) * total;
//     result.neutral = (param.neutral / 100) * total;

//     function acak3() {
//         var ttl = 100;
//         const nil1 = _.random(1, ttl);
//         ttl -= nil1;
//         const nil2 = _.random(1, ttl);
//         const nil3 = ttl - nil2;
//         const hasil = [nil1, nil2, nil3];
//         const isNegativeOrZero = _.some(hasil, value => value <= 5);
//         if (isNegativeOrZero) return acak3()
//         return hasil
//     }

//     function acak4() {
//         var ttl = 100;
//         const nil1 = _.random(1, ttl);
//         ttl -= nil1;
//         const nil2 = _.random(1, ttl);
//         ttl -= nil2;
//         const nil3 = _.random(1, ttl);
//         const nil4 = ttl - nil3
//         const hasil = [nil1, nil2, nil3, nil4];
//         const isNegativeOrZero = _.some(hasil, value => value <= 5);
//         if (isNegativeOrZero) return acak4()
//         return hasil
//     }

//     const acak_positive = acak3()
//     const acak_negative = acak4()

//     const nil_positive = {
//         "confidence": _.round((acak_positive[0] / 100) * result.positive),
//         "supportive": _.round((acak_positive[1] / 100) * result.positive),
//         "positive": _.round((acak_positive[2] / 100) * result.positive),
//     }

//     const nil_negative = {
//         "unsupportive": _.round((acak_negative[0] / 100) * result.negative),
//         "uncomfortable": _.round((acak_negative[1] / 100) * result.negative),
//         "negative": _.round((acak_negative[2] / 100) * result.negative),
//         "dissapproval": _.round((acak_negative[3] / 100) * result.negative),
//     }

//     const nil_neutral = {
//         "undecided": _.round(_.random((94 / 100) * _.round(result.neutral), (99 / 100) * _.round(result.neutral)))
//     }

//     var hasil_nil = { ...nil_positive, ...nil_neutral, ...nil_negative }

//     return {
//         ...data,
//         ...hasil_nil
//     }
// }