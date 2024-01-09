const { execSync, spawn } = require('child_process')
const _ = require('lodash')
const { open } = require('openurl')
const moment = require('moment')

// open('https://tokopedia.com')

// execSync(`curl -s "https://wa.wibudev.com/code?text=${_.random(11111, 111111)}&&nom=6289697338821"`, { stdio: "inherit" })
// console.log("kirim")

// console.log((new Date((new Date().setDate((new Date().getDate()) - 1)))).toISOString().split('T')[0])

// console.log((new Date().toISOString().split('T')[0]))


class Acak {
    list_data;

    hitung(atas, bawah) {
        let nilai = 100
        const ran1 = _.random(bawah, atas)
        nilai -= ran1
        const ran2 = _.random(5, (nilai - 10))
        nilai -= ran2
        const total = [ran1, ran2, nilai]
        return total
    }

    parse() {
        const satu = this.hitung(40, 60)
        const dua = this.hitung(30, 50)
        const tiga = this.hitung(20, 40)

        return [satu, dua, tiga]
    }

    kerjakan(date) {
        if (!date) throw new Error("date gk bole kosong")
        const data = this.parse()
        const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD")
        const today = moment().format("YYYY-MM-DD")

        const child = spawn(`
raven mpe -f "${date}" -t "${today}" -P 1 -p ${data[0][0]} -n ${data[0][1]} -l ${data[0][2]} T false &&
raven mpe -f "${date}" -t "${today}" -P 2 -p ${data[1][0]} -n ${data[1][1]} -l ${data[1][2]} T false &&
raven mpe -f "${date}" -t "${today}" -P 3 -p ${data[2][0]} -n ${data[2][1]} -l ${data[2][2]} T false
`)
        return child
    }

}




