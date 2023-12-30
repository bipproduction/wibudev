const { spawn } = require('child_process')
const path = require('path')
const moment = require('moment')
var child = null;
var waktu = null;
var tm = null;


module.exports = async function (param) {

    // const res = await fetch('https://wibudev.wibudev.com/val/runing-app')
    // const json_app = (await res.json()).data
    // const list_app = json_app.map((v) => v.name)

    const apps = (await fetch(`${param.url}/val/list-app`).then(v => v.json())).data
    const app = apps.find((v) => v.name === param['--name'])

    if (!app) return spawn('/bin/bash', ['-c', 'echo "app not found | 404"'])

    if (param['start']) {
        if (!child || child.exitCode !== null) {
            const pt = path.join(__dirname, `./../../../${app.name}`)
            child = spawn("/bin/bash", ['-c', `cd ${pt} && npx prisma studio --port ${app.studio_port}`]);

            // Atur timeout untuk menghentikan proses setelah 4 detik
            tm = setTimeout(() => {
                child.kill();
                waktu = null;
                child = null;
                clearTimeout(tm);
            }, 1000 * 60 * 5);
            
            waktu = moment().add(5, "minutes").format("YYYY-MM-DD HH:mm:ss");

            return spawn("echo", [`studio berjalan otomatis mati di: ${waktu} / 5 menit dari sekarang - port ${app.studio_port}`])
        } else {
            return spawn('echo', [`proses sedang berjalan berakhir pada : ${waktu} - port ${app.studio_port}`]);
        }
    }

    if (param['stop']) {
        if (child) {
            child.kill();
            waktu = null;
            clearTimeout(tm);
        }

        return spawn("/bin/bash", ["-c", `npx kill-port ${app.studio_port}`])
    }

    return spawn("echo", ['perintah tidak jelas'])
}