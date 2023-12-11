const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('colors')


const list_package = ["papaparse", "lodash", "colors", "cross-fetch", "moment", "ip", "prompts", "columnify"]

async function main() {
    const tmp = path.join(__dirname, "./bin_tmp")
    const input = path.join(__dirname, "./bin")
    const output = path.join(__dirname, "./bin_ok")
    const dir = fs.readdirSync(input)

    execSync(`rm -rf ${tmp}/*`)
    execSync(`rm -rf ${output}/*`)

    for (let r of dir) {
        let file = fs.readFileSync(`${input}/${r}`).toString()
        const versionMatch = file.match(/Version: .*/);
        const version_text = versionMatch[0].split(": ")[1]
        const version_value = version_generator(version_text)
        const version_result = `Version: ${version_value}`
        file = file.replace(versionMatch[0], version_result)
        fs.writeFileSync(`${input}/${r}`, file)
    }

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
                    file = file.replace(`require('${p}')`, `require(\`\${root}/makuro/node_modules/${p}\`)`)
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

/**
 * 
 * @param {string} ver 
 * @returns string
 */
function version_generator(ver) {
    if (!ver) throw new Error("ver tidak boleh kosong")
    const v = ver.split('.').map(Number)
    v[2]++;
    return v.join(".")
}


main()