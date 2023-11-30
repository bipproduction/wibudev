const root = require('child_process').execSync('npm root -g').toString().trim()
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const list_package = ["papaparse"]

function main() {
    let file = fs.readFileSync(path.join(__dirname, "./xcoba2.js")).toString()
    for (let p of list_package) {
        const target = `require('${p}')`
        const replacement = `require(\`\${root}/${p}\`)`
        if (file.includes(target)) {
            file = file.replace(target, replacement)
        }

    }
    fs.writeFileSync(path.join(__dirname, "./xcoba2.js"), file, "utf-8")
    console.log("success")

}

async function coba(){
    const list_audience = await fetch('https://wibudev.wibudev.com/assets/list-audience')
    const data = await list_audience.json()
    console.log(data)
}
