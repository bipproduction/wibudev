const _ = require('lodash')

const nama = {
    name: "malik",
    alamat: "denpasar"
}


console.log(_.flatten(_.entries(nama)))

