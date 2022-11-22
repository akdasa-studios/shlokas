#!/bin/sh

# ionic dev tools
npm install -g @ionic/cli@latest
npm install -g capacitor-resources
npm install -g eslint
npm install -g playwright && playwright install && playwright install-deps

# project dependencies
npm install