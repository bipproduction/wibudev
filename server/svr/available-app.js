const fs = require('fs')
const path = require('path');

; (async () => {
    const dir = fs.readdirSync(path.join(__dirname, './../app/src'))
    console.log(JSON.stringify(dir))
})()