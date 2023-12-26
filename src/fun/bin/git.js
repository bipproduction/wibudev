const _ = require('lodash')
const yargs = require('yargs')
const { execSync } = require('child_process')
const { box } = require('teeti')
const loading = require('loading-cli')('loading ...').start()
module.exports = async function (param) {
    // loading.start()
    const currentBranch = execSync('git branch --show-current').toString().trim();
    const args = yargs
        .scriptName("git")
        .command("push", "push otomatis sesuai dengan current branch")
        // .command('pull')
        .version("1.0.0")
        .parse()

    if (args._[1] === "push") {
        loading.stop()
        try {
            execSync(`git add -A && git commit -m "auto push" && git push origin ${currentBranch}`, { stdio: "inherit" })
            return console.log(box("SUCCESS").green)
        } catch (error) {
            return console.log(box("GAGAL").yellow)
        }

    }


    if (args._[1] === "pull") {

        // loading.stop()
        return
    }

    loading.stop()
    yargs.showHelp()


}