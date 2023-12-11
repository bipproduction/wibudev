; (() => {
    require('child_process').execSync(`node server/app/src/encrypt.js encrypt -i server/app/src -o server/app/out`, { stdio: "inherit" })
})()