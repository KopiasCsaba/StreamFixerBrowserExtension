#!/bin/bash
# This starts the compilation of the admin-gui

DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"
#./node_modules/.bin/webpack-cli --env prod  --watch &
#./node_modules/.bin/webpack-cli --env dev  --watch
npx webpack --env prod  --watch &
npx webpack --env dev  --watch
