const yargs = require('yargs')
const _ = require('lodash')
const fs = require('fs')
const colors = require('colors')
const path = require('path')
const { execSync } = require('child_process')
const { fetch } = require('cross-fetch')
const qr = require('qrcode-terminal')
const { address } = require('ip')
const loading = require('loading-cli')('loading ...').start()

module.exports = async function (param) {
    loading.stop()
    const is_flutter = fs.existsSync('pubspec.yaml')
    if (!is_flutter) return console.log("bukan flutter project, pastikan berada pada flutter project".yellow)
    yargs
        .scriptName("flutter")
        .command(
            "build",
            "build android",
            yargs => yargs,
            argv => build(argv, param)
        )
        .command(
            "install-package",
            "install keperluan package",
            yargs => yargs
                .options({
                    "package": {
                        alias: "p",
                        string: true,
                        default: 'a',
                        choices: ['a', 'b'],
                        demandOption: true
                    }
                }),
            argv => funInstallPackage(argv)
        )
        .command(
            "download-apk",
            "qrcode untuk mendownload apk",
            yargs => yargs
                .options({
                    "name": {
                        alias: "n",
                        desc: "custom nama file apk",
                        demandOption: true,
                        string: true
                    }
                }),
            argv => funDownloadApk(argv, param))
        .help()
        .recommendCommands()
        .demandCommand(1)
        .parse(process.argv.splice(3))
}

async function build(argv, param) {
    const arg = _.omit(argv, ['_', '$0'])
    await funJks(param)
    await funCreateIcon(param)
    await generate_key_properties()
    await generate_grandle(param)
    await generate_manifest()
    await generate_icon()
    execSync(`flutter clean && rm -rf build && flutter build apk --release`, { stdio: "inherit" })
    fs.unlinkSync('./android/key.properties')
    fs.unlinkSync('/tmp/_.jks')

}

async function funDownloadApk(argv) {
    // console.log(path.resolve('./build/app/outputs/apk/release/app-release.apk'))
    const adr = `http://${address()}:3322`
    qr.generate(adr, (data) => {
        console.log(data)
        console.log(adr)
        const express = require('express')
        const app = express()

        app.get('/', (req, res) => {

            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', `attachment; filename="${argv.name}.apk"`);

            return res.sendFile(path.resolve('./build/app/outputs/apk/release/app-release.apk'))
        })
        app.listen(3322)
    })
}



// ========== FUN=============

async function funCreateIcon(param) {
    const assets = fs.existsSync('assets')
    if (!assets) fs.mkdirSync('assets')
    const icon = fs.existsSync('assets/icon')
    if (!icon) fs.mkdirSync('assets/icon')
    const app_icon = fs.existsSync('assets/icon/app_icon.png')
    if (!app_icon) {
        const res = await fetch(`${param.url}/val/app-icon`)
        const data = await res.json()
        const gam = new Buffer.from(data.data, "base64")
        fs.writeFileSync("assets/icon/app_icon.png", gam)
        return console.log("create icon success")
    }
    return console.log("icon ok")
}

async function funJks(param) {
    const ada_jks = fs.existsSync("/tmp/_.jks")
    if (ada_jks) return console.log("jks ok")
    const res = await fetch(`${param.url}/val/jks`)
    const data = await res.json()
    const buf = new Buffer.from(data.data, "base64")
    fs.writeFileSync("/tmp/_.jks", buf)
    return console.log("create jks ok")
}

async function generate_key_properties() {
    const properties = `
storePassword=makuro123
keyPassword=makuro123
keyAlias=malikkurosaki
storeFile=/tmp/_.jks
`

    fs.writeFileSync("./android/key.properties", properties, "utf-8")
    return console.log("properties ok")
}


async function generate_grandle(param) {
    const source_gradle = fs.readFileSync('./android/app/build.gradle').toString()
    const np = source_gradle.match("namespace.+")[0].replace("namespace ", "")

    const res = await fetch(`${param.url}/val/flutter-build-gradle`)
    const build_gradle = (await res.json()).data.replace(`namespace ""`, `namespace ${np}`).replace(`applicationId ""`, `applicationId ${np}`)

    fs.writeFileSync("./android/app/build.gradle", build_gradle, "utf-8")
    return console.log("gradle ok")
}

async function generate_manifest() {
    let manifest = fs.readFileSync("./android/app/src/main/AndroidManifest.xml").toString()
    let f_manifest = manifest.match(`<uses-permission android:name="android.permission.INTERNET"/>`)
    if (f_manifest) return console.log("manifest ok 1")

    let replcement = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
    `
    manifest = manifest.replace(`<manifest xmlns:android="http://schemas.android.com/apk/res/android">`, replcement)

    fs.writeFileSync("./android/app/src/main/AndroidManifest.xml", manifest, "utf-8")
    return console.log("manifest ok 2")
}

async function generate_icon() {
    const launcher_fill = `
flutter_launcher_icons:
    android: true
    ios: true
    image_path: "assets/icon/app_icon.png"  
    `.trim()
    const pub = fs.readFileSync("./pubspec.yaml").toString()
    const asset_dir = fs.existsSync("./assets/icon/app_icon.png")
    if (!asset_dir) return console.log("!! no app_icon.png")
    const package = pub.match('flutter_launcher_icons')
    if (!package) {
        console.log("-- add package flutter_launcher_icons")
        execSync('flutter pub add flutter_launcher_icons', { stdio: "inherit" })
        console.log("++ success")
    }

    const file_launcher = fs.existsSync('flutter_launcher_icons.yaml')
    if (!file_launcher) {
        console.log("-- create flutter_launcher_icons.yaml")
        fs.writeFileSync('flutter_launcher_icons.yaml', launcher_fill, "utf-8")
        console.log("++ success")
    }

    console.log("-- generate icon launcher")
    execSync('dart run flutter_launcher_icons --file flutter_launcher_icons.yaml', { stdio: "inherit" })
    return console.log("++ success")

}

async function funInstallPackage(argv) {
    loading.start()
    const package = {
        "a": ["get", "get_storage", "flutter_card_swiper", "logger"]
    }

    if (argv.p === "a") {
        execSync(`flutter pub add ${package.a.join(" ")}`)
        loading.stop()
        return console.log("SUCCESS".green)
    }

    loading.stop()
}