const app_list = require('../json/app.json');
const _ = require('lodash')
; (async () => {
    console.log(JSON.stringify(app_list.map((v) => ({..._.omit(v, ['script'])})), null, 2))
})()