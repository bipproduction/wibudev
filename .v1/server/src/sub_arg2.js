const _ = require('lodash')

function sub_arg2(list_prop, arg) {
    const prop = {}
    const require = []
    for (let i in list_prop) {
        const idx = arg.findIndex((v) => v === list_prop[i])
        if (idx > -1) {
            const val = arg[idx + 1]
            if (val) {
                prop[arg[idx]] = val
            } else {
                prop[list_prop[i]] = true
            }
        } else {
            require.push(list_prop[i])
        }
    }

    return {
        success: _.isEmpty(require),
        data: prop,
        require
    }
}

module.exports = sub_arg2