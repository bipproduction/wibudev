const root = require('child_process').execSync('npm root -g').toString().trim();
const papa = require(`${root}/papaparse`)
const _ = require(`${root}/lodash`)
const { fstat } = require('fs')
const arg = process.argv.splice(2)
const fs = require('fs')
const path = require('path')
const list_audience = require('./../assets/audience.json')

const TYPE_ITEM = {
    id: null,
    idCandidate: null,
    idProvinsi: null,
    idKabkot: null,
    candidate: null,
    provinsi: null,
    kabkot: null,
    date: null,
    time: null,
    confidence: null,
    supportive: null,
    positive: null,
    undecided: null,
    unsupportive: null,
    uncomfortable: null,
    negative: null,
    dissapproval: null
}


function sub_arg(list_prop, arg) {
    const prop = {}
    const require = []

    for (let i in list_prop) {
        const idx = arg.findIndex((v) => v === list_prop[i])
        if (idx > -1) {
            const val = arg[idx + 1]
            if (val) {
                prop[arg[idx]] = val
            } else {
                prop[list_prop[i]] = null
                require.push(list_prop[i])
            }
        } else {
            prop[list_prop[i]] = null
            require.push(list_prop[i])
        }

    }

    if (require.length > 0) {
        console.log(`
Require:
${list_prop.join("\n")}
        `)
        return null
    }
    return prop
}

function perhitungan(param, data) {
    const total = +list_audience.find((v) => +v.idProvinsi === +data.idProvinsi && +v.idKabkot === +data.idKabkot).value
    const result = {}
    result.positive = (param.positive / 100) * total;
    result.negative = (param.negative / 100) * total;
    result.neutral = (param.neutral / 100) * total;

    function acak3() {
        var ttl = 100;
        const nil1 = _.random(1, ttl);
        ttl -= nil1;
        const nil2 = _.random(1, ttl);
        const nil3 = ttl - nil2;
        const hasil = [nil1, nil2, nil3];
        const isNegativeOrZero = _.some(hasil, value => value <= 5);
        if (isNegativeOrZero) return acak3()
        return hasil
    }

    function acak4() {
        var ttl = 100;
        const nil1 = _.random(1, ttl);
        ttl -= nil1;
        const nil2 = _.random(1, ttl);
        ttl -= nil2;
        const nil3 = _.random(1, ttl);
        const nil4 = ttl - nil3
        const hasil = [nil1, nil2, nil3, nil4];
        const isNegativeOrZero = _.some(hasil, value => value <= 5);
        if (isNegativeOrZero) return acak4()
        return hasil
    }

    const acak_positive = acak3()
    const acak_negative = acak4()

    const nil_positive = {
        "confidence": _.round((acak_positive[0] / 100) * result.positive),
        "supportive": _.round((acak_positive[1] / 100) * result.positive),
        "positive": _.round((acak_positive[2] / 100) * result.positive),
    }

    const nil_negative = {
        "unsupportive": _.round((acak_negative[0] / 100) * result.negative),
        "uncomfortable": _.round((acak_negative[1] / 100) * result.negative),
        "negative": _.round((acak_negative[2] / 100) * result.negative),
        "dissapproval": _.round((acak_negative[3] / 100) * result.negative),
    }

    const nil_neutral = {
        "undecided": _.random((94 / 100) * _.round(result.neutral), (99 / 100) * _.round(result.neutral))
    }

    var hasil_nil = { ...nil_positive, ...nil_neutral, ...nil_negative }

    return {
        ...data,
        ...hasil_nil
    }
}

function help() {
    console.log(`\n
HELP:
------------------
--positive  number
--negative  number
--neutral   number
--file      nama file format csv

contoh --positive 50 --negative 40 --neutral 10 --file jokowi.csv -- lock-aud 100000

`)
}

function main() {
    const require = {
        "--positive": null,
        "--negative": null,
        "--neutral": null,
        "--file": null
    }
    if (arg.length === 0) return help()
    /**
     * @type {require}
     */
    const sub = sub_arg(_.keys(require), arg)
    if (!sub) return


    if (!fs.existsSync(sub['--file'])) return console.log("pastikan file ada dan berformat csv")
    const file = fs.readFileSync(sub['--file']).toString().trim()
    const file_json = papa.parse(file, { header: true }).data

    const param = {
        positive: +sub['--positive'],
        negative: +sub['--negative'],
        neutral: +sub['--neutral']
    }

    if (_.sum(_.values(param)) !== 100) return console.log("parameter harus bertotal 100")

    /**
     * @type {TYPE_ITEM[]}
     */
    const hasil = []
    for (let fj of file_json) {
        const gen = perhitungan(param, fj, 3000)
        hasil.push(gen)
    }

    const _positive = +_.sum([_.sumBy(hasil, (v) => v.confidence), _.sumBy(hasil, (v) => v.supportive), _.sumBy(hasil, (v) => v.positive)])
    const _negative = +_.sum([_.sumBy(hasil, (v) => v.unsupportive), _.sumBy(hasil, (v) => v.uncomfortable), _.sumBy(hasil, (v) => v.negative), _.sumBy(hasil, (v) => v.dissapproval)])
    const _neutral = +_.sum([_.sumBy(hasil, (v) => v.undecided)])

    const _total = _.sum([_positive, _negative, _neutral])

    const _per = {
        positive: _.round((_positive / _total) * 100, 2),
        negative: _.round((_negative / _total) * 100, 2),
        neutral: _.round((_neutral / _total) * 100, 2)
    }

    console.log(_per)
    const _unparse = papa.unparse(hasil, { header: true })
    // console.log(_unparse)
    fs.writeFileSync(`manipulate_${sub['--file']}`, _unparse)
    console.log("success")

}

main()