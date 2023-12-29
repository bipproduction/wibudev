const { spawn } = require('child_process');
const path = require('path');

/**
 * @type {import('child_process').ChildProcess}
 */
let child;

module.exports = function (param) {
    const name = param['--name'];

    const list_app = require(path.join(__dirname, './../ast/apps.json'));
    const app = list_app.find((v) => v.name === name);

    if (!app) {
        child = spawn('echo', ['app tidak tersedia']);
        return child;
    }

    if (!child || child.exitCode !== null) {
        child = spawn('pm2', ['log', app.id]);

        // Atur timeout untuk menghentikan proses setelah 4 detik
        const tm = setTimeout(() => {
            child.kill();
            clearTimeout(tm);
        }, 4000);
    } else {
        child = spawn('echo', ['proses sedang berjalan']);
    }

    return child;
};
