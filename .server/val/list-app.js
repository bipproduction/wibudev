const app_list = require('../json/app.json');
const _ = require('lodash')

module.exports = async () => {
    return app_list.map((v) => ({ ..._.omit(v, ['script']) }))
}