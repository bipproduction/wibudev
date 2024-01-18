const JSONdb = require('simple-json-db')
const { box } = require('teeti')

const { launch, getStream } = require("puppeteer-stream");
const puppeteer = require('puppeteer');
const { spawn } = require("child_process");
require('colors')
const moment = require('moment')
const waktu_mulai = moment()

module.exports = async function (param) {
    const up = (await import('log-update')).default

    const db = new JSONdb(param.data.db_dir)
    if (!db.has("ytb_key")) return console.log(box('set key first'))

    const browser = await launch({
        executablePath: puppeteer.executablePath(),
        defaultViewport: {
            width: 1280,
            height: 720,
        },
        headless: true
    });

    const page = await browser.newPage();
    await page.goto("https://google.com");
    const stream = await getStream(page, { audio: true, video: true });
    console.log("recording");

    const YOUTUBE_URL = "rtmp://a.rtmp.youtube.com/live2";
    const KEY = db.get("ytb_key");

    const ffmpegCommand = "ffmpeg";
    const ffmpegArgs = [
        "-fflags", "+genpts",
        "-i", "-",
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
        `${YOUTUBE_URL}/${KEY}`
    ];
    
    

    const ffmpegProcess = spawn(ffmpegCommand, ffmpegArgs);
    stream.pipe(ffmpegProcess.stdin);
    ffmpegProcess.stdout.on("data", (data) => {
        const log = `[${moment().diff(waktu_mulai, "hours")}] start: ${waktu_mulai.format("YYYY-MM-DD HH:mm:ss")}  now: ${moment().format("YYYY-MM-DD HH:mm:ss")}`
        up(box(log).cyan)
    })
    ffmpegProcess.stderr.on("data", data => {

        const log = `
[${moment().diff(waktu_mulai, "days")}]  hari
[${moment().diff(waktu_mulai, "hours")}]  jam
[${moment().diff(waktu_mulai, "minutes")}]  menit

start:  ${waktu_mulai.format("YYYY-MM-DD HH:mm:ss")}  
now:    ${moment().format("YYYY-MM-DD HH:mm:ss")}`
        up(box(log).yellow)
    })

}