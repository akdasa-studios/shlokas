brew install cocoapods
brew install node@18
brew link node@18
pod install

# build web project
cd $CI_WORKSPACE
npm install
npm run build
