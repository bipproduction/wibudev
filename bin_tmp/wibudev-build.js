const root = require('child_process').execSync('npm root -g').toString().trim();
const { fetch } = require(`${root}/cross-fetch`);
; (async () => {
    await fetch('https://wibudev.wibudev.com/build', { method: "POST" }).then(async (v) => {
        if (v.status === 200) {
            console.log("BUILD ON SERVER SUCCESS".cyan)
        } else {
            console.log("BUILD ON SERVER ERROR".yellow)
        }
    })

    console.log("success".green)
})()