const path = require('path')
const fs = require('fs')
module.exports = async function (param) {
    const pt = path.join(__dirname, `./../../../${param["appName"]}/.env`)
    const ada = fs.existsSync(pt)
    if (!ada) return "no project available | node database"
    const data = fs.readFileSync(pt).toString().trim()
    const regex = /DATABASE_URL="[^@]+@[^:]+:([^\/]+)\/([^?]+)/;
    const match = data.match(regex);
    return match[2]
}