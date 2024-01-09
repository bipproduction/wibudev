module.exports = async function () {
    const build_gradle = `
    plugins {
        id "com.android.application"
        id "kotlin-android"
        id "dev.flutter.flutter-gradle-plugin"
    }
    
    def localProperties = new Properties()
    def localPropertiesFile = rootProject.file('local.properties')
    if (localPropertiesFile.exists()) {
        localPropertiesFile.withReader('UTF-8') { reader ->
            localProperties.load(reader)
        }
    }
    
    def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
    if (flutterVersionCode == null) {
        flutterVersionCode = '1'
    }
    
    def flutterVersionName = localProperties.getProperty('flutter.versionName')
    if (flutterVersionName == null) {
        flutterVersionName = '1.0'
    }
    
    def keystoreProperties = new Properties()
    def keystorePropertiesFile = rootProject.file('key.properties')
    if (keystorePropertiesFile.exists()) {
        keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
    }
    
    android {
        namespace ""
        compileSdkVersion flutter.compileSdkVersion
        ndkVersion flutter.ndkVersion
    
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
    
        kotlinOptions {
            jvmTarget = '1.8'
        }
    
        sourceSets {
            main.java.srcDirs += 'src/main/kotlin'
        }
    
        defaultConfig {
            // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
            applicationId ""
            // You can update the following values to match your application needs.
            // For more information, see: https://docs.flutter.dev/deployment/android#reviewing-the-gradle-build-configuration.
            minSdkVersion flutter.minSdkVersion
            targetSdkVersion flutter.targetSdkVersion
            versionCode flutterVersionCode.toInteger()
            versionName flutterVersionName
        }
    
            signingConfigs {
            release {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
                storePassword keystoreProperties['storePassword']
            }
        }
        
        buildTypes {
            release {
                signingConfig signingConfigs.release
            }
        }
    }
    
    flutter {
        source '../..'
    }
    
    dependencies {}   
    `
    return build_gradle
}