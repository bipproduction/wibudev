const root = require('child_process').execSync('npm root -g').toString().trim()
const fs = require('fs')
const path = require('path')

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


main()