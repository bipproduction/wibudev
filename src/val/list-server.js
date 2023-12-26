const { execSync } = require('child_process');
const _ = require('lodash');

module.exports = async function () {
    const ls = execSync('ls /etc/nginx/sites-enabled').toString().trim()
    const lines = ls.trim().split('\n');
    const serverJson = _.chain(lines)
        .map(line => line.split(/\s+/))
        .map(([key, ...values]) => ({ [key]: key }))
        .reduce(_.merge)
        .value();

    return serverJson
}