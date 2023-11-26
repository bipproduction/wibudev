/**
 * 
 * @param {any[]} list_prop 
 * @param {any[]} arg 
 * @returns 
 */
module.exports = function sub_arg(list_prop, arg) {
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