const JSONdb = require('simple-json-db')
const { box } = require('teeti')
module.exports = async function (param) {
    const db = new JSONdb(param.data.db_dir)
    db.set('ytb_key', param.k)
    console.log(box("success"))
}