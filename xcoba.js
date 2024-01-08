const { execSync } = require('child_process')
const _ = require('lodash')
const { open } = require('openurl')

// open('https://tokopedia.com')

// execSync(`curl -s "https://wa.wibudev.com/code?text=${_.random(11111, 111111)}&&nom=6289697338821"`, { stdio: "inherit" })
// console.log("kirim")

// console.log((new Date((new Date().setDate((new Date().getDate()) - 1)))).toISOString().split('T')[0])

// console.log((new Date().toISOString().split('T')[0]))

function acak(atas, bawah) {
    let nilai = 100
    const ran1 = _.random(bawah, atas)
    nilai -= ran1
    const ran2 = _.random(5, (nilai - 10))
    nilai -= ran2
    const total = [ran1, ran2, nilai]
    return total
}

const satu = acak(40, 60)
const dua = acak(30, 50)
const tiga = acak(20, 40)


