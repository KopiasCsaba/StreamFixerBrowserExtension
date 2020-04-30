#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"

bash ./copy.sh
cd ../firefox/;
zip -r -FS ../releases/StreamFixerFirefox.xpi  ./* --exclude *.git*.