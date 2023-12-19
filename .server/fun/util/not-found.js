const arg = process.argv.splice(2)
require('colors')
module.exports = () => {
    console.log('Not Found', arg[0].yellow)
}