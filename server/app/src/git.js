const colors = require('colors');
const { program } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

; (async () => {
    if (!fs.existsSync('.git')) return console.log("not git repo".yellow);
    const currentBranch = execSync('git branch --show-current').toString().trim();

    program
        .option('-b, --branch [nama]', 'show branch')
        .option('-pa, --push-auto', 'melakukan kegiatan push git auto')
        .showHelpAfterError()
        .showSuggestionAfterError()
        .parse()

    const opt = program.opts()
    if (_.isEmpty(opt)) {
        return program.help()
    }

    if (opt.branch === true) {
        return console.log("curent branch is", currentBranch.green)
    }

    if (opt.pushAuto) {
        const branch = opt.branch ?? currentBranch
        execSync(`git add -A && git commit -m "push auto" && git push origin ${branch}`, { stdio: "inherit" })
        return console.log("push auto success branch ", branch.green)
    }

})();