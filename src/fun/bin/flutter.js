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
        .command(
            "webview-create",
            "create new webview",
            yargs => yargs
                .options({
                    "name": {
                        alias: "n",
                        string: true,
                        desc: "name app",
                        demandOption: true
                    },
                    "url": {
                        alias: "u",
                        string: true,
                        desc: "name url contoh : https:// ....com",
                        demandOption: true
                    }
                }),
            funCreate
        )
        .command(
            "webview-modify",
            "memodifikasi project yang telah ada",
            yargs => yargs
                .options({
                    "url": {
                        alias: "u",
                        string: true,
                        desc: "name url contoh : https:// ....com",
                        demandOption: true
                    }
                }),
            funModify
        )
        .command(
            "apk-tele",
            "kirim apk ke telegram",
            yargs => yargs
                .options({
                    "number": {
                        alias: "n",
                        desc: "nomor telegram tujuan ex: +628969...",
                        string: true,
                        demandOption: true
                    }
                }),
            funApkTete
        )
        .help()
        .recommendCommands()
        .demandCommand(1)
        .parse(process.argv.splice(3))
}

async function build(argv, param) {
    const is_flutter = fs.existsSync('pubspec.yaml')
    if (!is_flutter) return console.log("bukan flutter project, pastikan berada pada flutter project".yellow)
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
    const is_flutter = fs.existsSync('pubspec.yaml')
    if (!is_flutter) return console.log("bukan flutter project, pastikan berada pada flutter project".yellow)
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
        "a": ["get", "get_storage", "flutter_card_swiper", "simple_logger"]
    }

    if (argv.p === "a") {
        execSync(`flutter pub add ${package.a.join(" ")}`)
        loading.stop()
        return console.log("SUCCESS".green)
    }

    loading.stop()
}

async function funCreate(argv) {
    const ada_project = fs.readFileSync('./pubspec.yaml')
    if (ada_project) return console.log("project sudah ada")
    execSync(`
    flutter create ${argv.name} 
    cd ${argv.name}
    flutter pub add webview_universal
    `.trim())

    fs.writeFileSync('./lib/main.dart', funDartMain(argv.url))
    console.log("success!")

}

async function funModify(argv) {
    const ada_project = fs.readFileSync('./pubspec.yaml')
    if (!ada_project) return console.log("pastikan ada didalam project dir")
    fs.writeFileSync('./lib/main.dart', funDartMain(argv.url))
    console.log("success!")
}

function funDartMain(url) {
    let main = `
    import 'dart:async';
    import 'package:flutter/material.dart';
    // import 'package:flutter/services.dart';
    import 'package:webview_universal/webview_universal.dart';
    
    void main() {
      // WidgetsFlutterBinding.ensureInitialized();
      // SystemChrome.setPreferredOrientations([
      //   DeviceOrientation.landscapeLeft,
      //   DeviceOrientation.landscapeRight,
      // ]);
    
      runApp(const MyApp());
    }
    
    class MyApp extends StatelessWidget {
      const MyApp({super.key});
    
      // This widget is the root of your application.
      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'HIPMI',
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
            useMaterial3: true,
          ),
          home: const MyHome(),
        );
      }
    }
    
    class MyHome extends StatefulWidget {
      const MyHome({super.key});
    
      @override
      State<MyHome> createState() => _MyHomeState();
    }
    
    class _MyHomeState extends State<MyHome> {
      WebViewController webViewController = WebViewController();
      bool isConnected = false;
    
      @override
      void initState() {
        super.initState();
        task();
        
      }
    
      Future<void> task() async {
        await webViewController.init(
          context: context,
          uri: Uri.parse("${url}"),
          setState: (void Function() fn) {},
        );
      }
    
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: SafeArea(
            child: Stack(
              children: [
                // Text("Halo Ini Ada Dimana"),
                // Text(webViewController.is_init.toString()),
                webViewController.is_init 
                    ? WebView(
                        controller: webViewController,
                      )
                    : const Text("loading ...")
              ],
            ),
          ),
        );
      }
    }
    
    `.trim()

    return main
}

async function funApkTete(argv) {
    const project_dir = fs.existsSync("./pubspec.yaml")
    const apk_build = fs.existsSync('./build/app/outputs/apk/release/app-release.apk')
    if (!project_dir) return console.log("tidak berada di project flutter")
    if (!apk_build) return console.log("build apk terlebih dahulu")
    execSync(`makuro _tele fl -n ${argv.n} -f ./build/app/outputs/apk/release/app-release.apk`, { stdio: "inherit" })
}