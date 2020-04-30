#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"

cp -r ../core/dist/prod/main.js ../firefox/
cp -r ../core/dist/prod/main.js ../chrome/