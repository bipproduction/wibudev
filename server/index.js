const express = require('express');
const { spawn, execSync, exec } = require('child_process');
const sub_arg = require('../sub_arg');
const build = require('./src/build');
const main_page = require('./src/main_page');
const log = require('./src/log');
const arg = process.argv.splice(2)
const app = express();

async function main() {
    const sub = sub_arg(['--port'], arg)
    if (!sub) return

    app.get('/', main_page)
 
    app.get("/build/:name", build)
    app.get("/log/:name", log)

   
    app.listen(sub['--port'], () => {
        console.log(`Server berjalan di port ${sub['--port']}`);
    });

}

main()
