const fs = require('fs')
const path = require('path');
const _ = require('lodash');

module.exports = async () => {
    const dir = fs.readdirSync(path.join(__dirname, './../app/src'))
    return dir.filter((v) => !_.startsWith(v, "_"))
}