const fs = require('fs')
const path = require('path')
module.exports = async function () {
    return fs.readFileSync(path.join(__dirname, "./../ast/_.jks")).toString("base64")
}