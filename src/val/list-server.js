const { execSync } = require('child_process');
const _ = require('lodash');

module.exports = async function () {
    const ls = execSync('ls /etc/nginx/sites-enabled').toString().trim()
    const lines = ls.trim().split('\n');
    const serverJson = _.flattenDeep(_.chain(lines)
        .map(line => line.split(/\s+/))
        .map((v) => ({
            "name": v[0],
            "port": v[0].split("_")[1]
        }))
        .value()).filter((v) => v.name !== "default");

    return serverJson
}