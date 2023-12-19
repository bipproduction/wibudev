const path = require('path');
const fs = require('fs');
const { Command, program } = require('commander')
const p = new Command();
const _ = require('lodash');
const JavaScriptObfuscator = require('javascript-obfuscator');
require('colors');

; (async () => {
    const data = program
        .name("encript")
        .description("ini adalah keterangannya")
        .version("1.0.0")
        .requiredOption("-i, --inp <char>", "directory input")
        .requiredOption('-o , --out <char>', 'directory output')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()
        .opts()

    const ada_input = fs.existsSync(data.inp)
    const ada_output = fs.existsSync(data.out)
    if (!ada_input) return console.log("pastikan ada input dir")
    if (!ada_output) return console.log("pastikan ada output dir")

    const inp_dir = fs.readdirSync(data.inp)
    const out_dir = fs.readdirSync(data.out)
    if (_.isEmpty(inp_dir)) return console.log("pastikan ada file didalam input dir")

    for (let d of out_dir) {
        const ada = inp_dir.find((v) => v === d)
        if (!ada) {
            fs.unlinkSync(`${data.out}/${d}`)
            console.log("hapus", d)
        }
    }

    const root = require('child_process').execSync('npm root -g').toString().trim()
    const makuro_package = require(`${root}/makuro/package.json`)
    const dep = makuro_package.dependencies
    const dep_list = _.keys(dep)

    for (let fl of inp_dir) {
        const path_file = `${data.inp}/${fl}`
        let file = fs.readFileSync(path_file).toString().trim()

        // menambahkan root require
        let root_target = `const root = require('child_process').execSync('npm root -g').toString().trim();\n`
        if (!file.includes(root_target)) {
            root_target += file
            file = root_target
        }

        for (let p of dep_list) {

            if (file.includes(`require('${p}')`)) {
                file = file.replace(`require('${p}')`, `require(\`\${root}/makuro/node_modules/${p}\`)`)
            }
        }

        const result = JavaScriptObfuscator.obfuscate(file, {
            compact: !![],
            controlFlowFlattening: !![],
            controlFlowFlatteningThreshold: 0x1,
            numbersToExpressions: !![],
            simplify: !![],
            stringArrayShuffle: !![],
            splitStrings: !![],
            stringArrayThreshold: 0x1
        })

        fs.writeFileSync(`${data.out}/${fl}`, result.getObfuscatedCode())
        console.log(`${data.out}/${fl}`, 'generated'.cyan)
    }

})()