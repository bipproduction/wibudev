const { execSync } = require('child_process');

; (() => {
    const data = JSON.parse(execSync(`pm2 jlist`).toString().trim())
    console.log(data)
})()