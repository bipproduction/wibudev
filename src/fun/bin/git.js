const _ = require('lodash')
const yargs = require('yargs')
const { execSync } = require('child_process')
const { box } = require('teeti')
module.exports = async function (param) {
    const currentBranch = execSync('git branch --show-current').toString().trim();
    const args = yargs
        .scriptName("git")
        .command("push", "push otomatis sesuai dengan current branch")
        .command('pull')
        .version("1.0.0")
        .parse()

    if (args._[1] === "push") {
        execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch}`)
        return console.log(box("SUCCESS").green)
    }

    if (args._[1] === "pull") {

        return
    }

    yargs.showHelp()


}