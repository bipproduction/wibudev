const { execSync } = require('child_process')
const _ = require('lodash')
const { open } = require('openurl')

// open('https://tokopedia.com')

// execSync(`curl -s "https://wa.wibudev.com/code?text=${_.random(11111, 111111)}&&nom=6289697338821"`, { stdio: "inherit" })
// console.log("kirim")

console.log((new Date((new Date().setDate((new Date().getDate()) - 1)))).toISOString().split('T')[0])

console.log((new Date().toISOString().split('T')[0]))
