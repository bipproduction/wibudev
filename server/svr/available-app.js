const fs = require('fs')
const path = require('path');
const _ = require('lodash');

; (async () => {
    const dir = fs.readdirSync(path.join(__dirname, './../app/src'))
    console.log(JSON.stringify(dir.filter((v) => !_.startsWith(v, "_"))))
})()