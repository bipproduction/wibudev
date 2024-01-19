const { spawn, exec } = require('child_process');
const JSONdb = require('simple-json-db');
const { box } = require('teeti');
const fs = require('fs');
const moment = require('moment');
const waktu_mulai = moment()

module.exports = async function (param) {
    const up = (await import('log-update')).default;

    const db = new JSONdb(param.data.db_dir);
    if (!db.has("ytb_key")) return console.log(box('set key first'));

    const YOUTUBE_URL = "rtmp://a.rtmp.youtube.com/live2";
    const KEY = db.get("ytb_key");

    const preset = `
ffmpeg -f avfoundation \
-framerate 30 \
-i "0" \
-map 0 \
-c:v libx264 \
-pix_fmt yuv420p \
-preset medium \
-r 30 \
-g $((30 * 2)) \
-b:v 2500k \
-bufsize 512k \
-c:a aac \
-ar 44100 \
-threads:v 6 \
-threads:a 2 \
-b:a 192k \
-f flv "${YOUTUBE_URL}/${KEY}"
    `
    const child = exec(preset)

    child.stdout.on("data", (data) => {
        up(data.toString().cyan)
    })

    child.stderr.on("data", data => {
        up(data.toString().yellow)
    })

    // const ffmpegArgs = [
    //     '-f', 'avfoundation',
    //     '-framerate', '30',
    //     '-i', '0',
    //     "-map", "0",
    //     "-c:v", "libx264",
    //     "-pix_fmt", "yuv420p",
    //     "-preset", "medium",
    //     "-r", 30,
    //     "-g", `${30 * 2}`,
    //     "-b:v", "2500k",
    //     "-bufsize", "512k",
    //     "-c:a", "aac",
    //     "-ar", "44100",
    //     "-threads:v", "6",
    //     "-threads:a", "2",
    //     "-b:a", "192k",
    //     "-f", "flv",
    //     `${YOUTUBE_URL}/${KEY}`
    // ];

    // const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);
    // ffmpegProcess.stderr.on("data", (data) => {
    //     const log = `
    //     [${moment().diff(waktu_mulai, "days")}]  hari
    //     [${moment().diff(waktu_mulai, "hours")}]  jam
    //     [${moment().diff(waktu_mulai, "minutes")}]  menit

    //     start:  ${waktu_mulai.format("YYYY-MM-DD HH:mm:ss")}  
    //     now:    ${moment().format("YYYY-MM-DD HH:mm:ss")}

    //     ${data.toString()}
    //     `;
    //     up(log.yellow);
    // });
    // ffmpegProcess.stdout.on("data", (data) => {
    //     const log = `
    //     [${moment().diff(waktu_mulai, "days")}]  hari
    //     [${moment().diff(waktu_mulai, "hours")}]  jam
    //     [${moment().diff(waktu_mulai, "minutes")}]  menit

    //     start:  ${waktu_mulai.format("YYYY-MM-DD HH:mm:ss")}  
    //     now:    ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    //     up(box(log).cyan);
    // });
};
