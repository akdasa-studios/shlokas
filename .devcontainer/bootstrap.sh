#!/bin/sh

# dev tools
npm install -g @ionic/cli@latest
npm install -g capacitor-resources
npm install -g eslint
npm install -g playwright

# project dependencies
npm install
npx playwright install && playwright install-deps