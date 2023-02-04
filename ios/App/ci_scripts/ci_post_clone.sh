#!/bin/bash
brew install cocoapods
brew install node@18
brew link node@18

cd "$CI_WORKSPACE"
npm install
npm run build
npx cap sync

cd ./ios/App
pod install