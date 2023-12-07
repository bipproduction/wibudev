function sub_arg(list_prop, arg) {
    if (!list_prop || list_prop.length === 0) throw new Error("require: list_prop[]")
    if (!arg || arg.length === 0) throw new Error("require: arg[]")

    const prop = {}
    for (let i in list_prop) {
        const idx = arg.findIndex((v) => v === list_prop[i])
        if (idx > -1) {
            const val = arg[idx + 1]
            if (val) {
                prop[arg[idx]] = val
            } else {
                prop[list_prop[i]] = true
            }
        }

    }

    return prop
}