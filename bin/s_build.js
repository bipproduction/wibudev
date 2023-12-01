require('colors');
const { exec } = require('child_process');

function s_build() {
    const child = exec('curl -s -o- -N -X POST https://wibudev.wibudev.com/build')
    child.stderr.on("data", (data) => {
        console.log(`[error]`.yellow, `${data}`.gray)
    })

    child.stdout.on("data", (data) => {
        console.log(`[data]`.green, `${data}`)
    })

    child.on("close", () => {
        console.log("[END]".cyan)
    })
}

s_build()
