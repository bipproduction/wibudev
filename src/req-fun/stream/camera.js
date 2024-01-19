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
    // const ffmpegArgs = [
    //     '-f', 'avfoundation',
    //     '-framerate', '30',
    //     '-i', '0:0',
    //     '-map', '0',
    //     '-c:v', 'libx264',
    //     '-pix_fmt', 'yuv420p',
    //     '-preset', 'medium',
    //     '-r', '30',
    //     '-g', '60',
    //     '-b:v', '2500k',
    //     '-bufsize', '512k',
    //     '-c:a', 'aac',
    //     '-ar', '44100',
    //     '-threads:v', '6',
    //     '-threads:a', '2',
    //     '-b:a', '192k',
    //     '-f', 'flv',
    //     `rtmp://85.31.224.193:1935/live/${os.hostname().replace(/\./g, "-")}`
    // ];

    const ffmpegArgs = [
        '-f', 'avfoundation',
        '-framerate', '30',
        `-video_device_index`, '0',
        '-audio_device_index', '0',
        '-i', ':0', // Nomor perangkat kamera (sesuaikan dengan nomor perangkat FaceTime HD Camera)
        '-f', 'avfoundation',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast', // Ganti dengan 'veryfast' jika diperlukan
        '-crf', '23', // Sesuaikan nilai crf sesuai kebutuhan Anda
        '-r', '30',
        '-g', '60',
        '-b:v', '2500k',
        '-bufsize', '512k',
        '-c:a', 'aac',
        '-ar', '44100',
        '-threads:v', '6',
        '-threads:a', '2',
        '-b:a', '192k',
        '-shortest',
        '-f', 'flv',
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
        // Tambahkan penghentian stream di sini jika diperlukan
        // Contoh: hentikan stream diakhiri dengan ctrl+C
        ffmpegProcess.stdin.write('\x03');
        ffmpegProcess.stdin.end();
    });
}