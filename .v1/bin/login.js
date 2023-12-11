const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const arg = process.argv.splice(2)
const _ = require('lodash');

; (async () => {

    const sub = sub_arg(["--email", "--password"], arg)
    if (!sub) return

})()

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
                prop[list_prop[i]] = true
            }
        } else {
            require.push(list_prop[i])
        }
    }

    if (_.isEmpty(require)) {
        console.log("require: ", _.keys(prop).join(" "))
        return null
    }
    return prop
}