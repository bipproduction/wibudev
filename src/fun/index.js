module.exports = async (param) => {
    const p = require('commander').program
        .argument('app <name>', 'app name')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()
    const arg = p.args
    require('require-from-url/sync')(`${param.url}/fun/${arg[0]}`)(param)
}