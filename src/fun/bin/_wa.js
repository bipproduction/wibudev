const { fetch } = require('cross-fetch')
const yargs = require('yargs')
module.exports = async function () {
    yargs
        .command(
            "kirim",
            "kirim wa",
            yargs => yargs
                .options({
                    "nom": {
                        alias: "n",
                        desc: "nomer",
                        demandOption: true
                    },
                    "text": {
                        alias: "t",
                        desc: "textnya",
                        demandOption: true
                    }
                }),
            funKirim
        )
        .demandCommand(1, "masukkan perintah")
        .recommendCommands()
        .help()
        .parse(process.argv.splice(3))

}

async function funKirim(argv) {
    const res = await fetch(`https://wa.wibudev.com/code?text=${argv.t}&&nom=${argv.n}`)
    const data = await res.json()
    console.log(data.status)
}