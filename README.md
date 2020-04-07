# vumonic-app

A React Native hybrid app built as a part of assessment for Vumonic DataLabs. Has Google sign-in, a post feed with likes and comments features.

# Installation

Make sure Git-cli and NPM are installed and then execute the following comments
```
        $ git clone https://github.com/ram95krishh/vumonic-app.git
        $ cd vumonic-app
        $ npm install
        $ cd ios/
        $ pod install
        $ cd ..
```
Open project in xcode using the command
```
        $ xed ios/
```
Download "GoogleService-Info.plist" and add it to the project in XCode
Now, run the project in ios simulator using the command
```
        $ react-native run-ios
```

Similarly, for android, use the command... (Make sure emulator or debug device is present)
```
        $ react-native run-android
```