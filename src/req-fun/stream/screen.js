const { spawn, exec } = require('child_process');
const JSONdb = require('simple-json-db');
const { box } = require('teeti');
const fs = require('fs');
const moment = require('moment');
const waktu_mulai = moment()
const os = require('os')
const colors = require('colors')

module.exports = async function (param) {
    const up = (await import('log-update')).default
    const ffmpegArgs = [
        '-f', 'avfoundation',
        '-i', '1:0',
        "-map", "0",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-r", 30,
        "-g", `${30 * 2}`,
        "-b:v", "2500k",
        "-bufsize", "512k",
        "-c:a", "aac",
        "-ar", "44100",
        "-threads:v", "6",
        "-threads:a", "2",
        "-b:a", "192k",
        "-f", "flv",
        `rtmp://85.31.224.193:1935/live/${os.hostname().replace(/\./g, "-")}`
    ];

    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

    ffmpegProcess.stdout.on('data', (data) => {
        up(`stdout: ${data}`.cyan)
    });

    ffmpegProcess.stderr.on('data', (data) => {
        up(`stdout: ${data}`.yellow)
    });

    ffmpegProcess.on('close', (code) => {
        up(`child process exited with code ${code}`.gray)
    });
}