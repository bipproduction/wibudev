const fs = require('fs')
const path = require('path')
module.exports = async function () {
    const data = fs.readFileSync(path.join(__dirname, "./../ast/app_icon.png")).toString("base64")
    return data
}