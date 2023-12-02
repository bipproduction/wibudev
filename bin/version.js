/**
 * 
 * @param {string} ver 
 * @returns string
 */
function version(ver) {
    const v = "1.0.0".split('.').map(Number)
    v[2]++;
    return v.join(".")
}
