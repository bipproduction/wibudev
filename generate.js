const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('colors')

const list_package = ["papaparse", "lodash", "colors", "cross-fetch", "moment", "ip"]

async function main() {
    const tmp = path.join(__dirname, "./bin_tmp")
    const input = path.join(__dirname, "./bin")
    const output = path.join(__dirname, "./bin_ok")
    const dir = fs.readdirSync(input)

    execSync(`rm -rf ${tmp}/*`)
    execSync(`rm -rf ${output}/*`)

    for (let d of dir) {
        try {
            let file = fs.readFileSync(`${input}/${d}`).toString()
            let root_target = `const root = require('child_process').execSync('npm root -g').toString().trim();\n`
            if (!file.includes(root_target)) {
                root_target += file
                file = root_target
            }
            for (let p of list_package) {
                if (file.includes(`require('${p}')`)) {
                    file = file.replace(`require('${p}')`, `require(\`\${root}/${p}\`)`)
                }
            }

            fs.writeFileSync(`${tmp}/${d}`, file, "utf-8")
        } catch (error) {
            console.log("error generate".red)
        }
    }

    const dir_tmp = fs.readdirSync(tmp)
    for (let t of dir_tmp) {
        try {
            execSync(`javascript-obfuscator ${tmp}/${t} -o ${output}/${t} --compact true --self-defending true --string-array true`)
            console.log(t, "-- generated".cyan)
        } catch (error) {

        }
    }
}

main()