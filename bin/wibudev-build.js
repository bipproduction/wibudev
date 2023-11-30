const { fetch } = require('cross-fetch');
require('colors')
; (async () => {
    await fetch('https://wibudev.wibudev.com/build', { method: "POST" }).then(async (v) => {
        if (v.status === 200) {
            // const text = await v.text()
            // console.log(text.gray)
            console.log("BUILD ON SERVER SUCCESS".cyan)

        } else {
            console.log("BUILD ON SERVER ERROR".yellow)
        }
    })

    console.log("success".green)
})()