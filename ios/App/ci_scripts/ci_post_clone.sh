brew install cocoapods
brew install node@18
brew link node@18

cd $CI_WORKSPACE
npm install

cd ./ios/App
pod install

cd $CI_WORKSPACE
npm run build
