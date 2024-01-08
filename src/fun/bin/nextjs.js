const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const colors = require('colors')
module.exports = async function () {
    yargs
        .scriptName("nextjs")
        .command(
            "limit",
            "fix limit size",
            yargs => yargs
                .options({
                    "size": {
                        alias: "s",
                        string: true,
                        default: 2,
                        desc: "[number] value limit default 2"
                    }
                }),
            argv => funLimit(argv)

        )
        .help()
        .recommendCommands()
        .demandCommand(1)
        .parse(process.argv.slice(3))
}

async function funLimit(argv) {
    const ada = fs.existsSync('./next.config.js')
    if (!ada) return console.log("pastikan pada project nextjs".yellow)
    const config = fs.readFileSync('./next.config.js', 'utf-8').toString().trim()
    const fun = eval(config)
    fun.experimental.serverActionsBodySizeLimit = `${argv.size}mb`

    const string_config = `
/** @type {import('next').NextConfig} */
const nextConfig = ${JSON.stringify(fun, null, 2)};

module.exports = nextConfig;
    `.trim()
    fs.writeFileSync('./next.config.js', string_config)
    console.log("success")


    // simpan fun menggunakan fs 
    //     isi dari fun adalah 
    //     /** @type {import('next').NextConfig} */
    // const nextConfig = {
    //     experimental: {
    //       serverActions: true
    //     },
    //   };

    //   module.exports = nextConfig;
}