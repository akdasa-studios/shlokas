#!/bin/sh

# fish config
mkdir -p ~/.config/fish
cp ./.devcontainer/config.fish ~/.config/fish/

# ionic dev tools
npm install -g @ionic/cli@latest
npm install -g capacitor-resources
npm install -g eslint

# project dependencies
npm install
