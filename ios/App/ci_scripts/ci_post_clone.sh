#!/bin/bash
brew install cocoapods
brew install node@18
brew link node@18

cd "$CI_WORKSPACE"
npm install
npm run build:prod
npx capacitor-set-version set:ios -v $(npm pkg get version) -b $CI_BUILD_NUMBER
npx cap sync

cd ./ios/App
pod install