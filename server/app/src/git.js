require('colors');
const { program } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const _ = require('lodash');
require('colors');

; (async () => {

    if (!fs.existsSync('.git')) return console.log("not git repo".yellow);
    const currentBranch = execSync('git branch --show-current').toString().trim();

    program
        .command("cmd <command>")
        .option('-b, --branch <branch>', "branch")
        .action(function (a, b, c) {

            switch (a) {
                case "branch":
                    console.log(currentBranch.green)
                    break
                case "push-auto":
                    const branch = b.branch ?? currentBranch
                    execSync(`git add -A && git commit -m "push auto" && git push origin ${branch}`, { stdio: "inherit" })
                    break
                default: console.log("no option")
            }
        })
        .showHelpAfterError()
        .parse();

    const opt = program.opts()

    // if (opt.current) {
    //     console.log("current branch", currentBranch.green)
    //     return
    // }

    // if (opt.pushAuto) {
    //     const branch = opt.branch ?? currentBranch
    //     execSync(`git add -A && git commit -m "push auto" && git push origin ${branch}`)
    //     return
    // }





})();